import sys
from tool_loader import load_tool
from validator import validate_target, validate_flags
from runner import run_container

def main():
    if len(sys.argv) < 3:
        print("Usage: python main.py <tool> <target> [flags]")
        sys.exit(1)

    tool_name = sys.argv[1]
    target = sys.argv[2]
    flags = sys.argv[3:]

    tool_config = load_tool(tool_name)

    validate_target(target)
    validate_flags(tool_config, flags)

    job = run_container(tool_config, target, flags)

    print(f"\nScan ID: {job.id}")
    print(f"Status: {job.status}")
    print(f"Exit Code: {job.exit_code}")
    print(f"Started: {job.started_at}")
    print(f"Finished: {job.finished_at}")

if __name__ == "__main__":
    main()
