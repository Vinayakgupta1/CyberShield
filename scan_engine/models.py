from dataclasses import dataclass, field
from datetime import datetime
from typing import List

@dataclass
class ScanJob:
    id: str
    tool: str
    target: str
    args: List[str]
    status: str = "CREATED"
    started_at: datetime = None
    finished_at: datetime = None
    exit_code: int = None
    error: str = None
