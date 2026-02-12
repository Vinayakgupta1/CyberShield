import docker
import os
import uuid
from datetime import datetime

from models import ScanJob

docker_client = docker.from_env()
ARTIFACTS_DIR = "artifacts"

def run_container(tool_config, target, args):
    job_id = str(uuid.uuid4())
    job = ScanJob(
        id=job_id,
        tool=tool_config["name"],
        target=target,
        args=args
    )

    job.status = "RUNNING"
    job.started_at = datetime.utcnow()

    os.makedirs(f"{ARTIFACTS_DIR}/{job_id}", exist_ok=True)

    try:
        container = docker_client.containers.run(
            image=tool_config["image"],
            command=args + [target],
            network="scan-net",
            mem_limit=tool_config.get("memory", "512m"),
            detach=True
        )

        result = container.wait(timeout=tool_config.get("timeout", 300))
        output = container.logs()

        job.exit_code = result["StatusCode"]

        # Save raw output
        with open(f"{ARTIFACTS_DIR}/{job_id}/{tool_config['name']}_raw.txt", "wb") as f:
            f.write(output)

        container.remove(force=True)

        job.status = "COMPLETED" if job.exit_code == 0 else "FAILED"

    except Exception as e:
        job.status = "FAILED"
        job.error = str(e)

    job.finished_at = datetime.utcnow()
    return job
