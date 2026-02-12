import re

IP_REGEX = r"^(\d{1,3}\.){3}\d{1,3}$"
DOMAIN_REGEX = r"^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$"

def validate_target(target: str):
    if re.match(IP_REGEX, target):
        return True
    if re.match(DOMAIN_REGEX, target):
        return True
    raise ValueError("Invalid target format")

def validate_flags(tool_config, args):
    allowed = tool_config.get("allowed_flags", [])

    for arg in args:
        if arg.startswith("-") and arg not in allowed:
            raise ValueError(f"Flag '{arg}' not allowed for tool '{tool_config['name']}'")

    return True
