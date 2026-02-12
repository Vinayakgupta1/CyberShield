import yaml
import os

TOOLS_PATH = "tools"

def load_tool(tool_name: str):
    tool_path = os.path.join(TOOLS_PATH, tool_name, "tool.yaml")

    if not os.path.exists(tool_path):
        raise ValueError(f"Tool '{tool_name}' not found.")

    with open(tool_path, "r") as f:
        return yaml.safe_load(f)
