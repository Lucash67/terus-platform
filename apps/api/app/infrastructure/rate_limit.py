"""Rate limit simples por janela fixa, em memória do processo.

Suficiente para dev/preview com uma instância. Em produção com várias
réplicas, trocar por implementação em Redis (pendência registrada).
"""

import time
from collections import defaultdict

from app.shared.exceptions import RateLimited


class FixedWindowLimiter:
    def __init__(self) -> None:
        self._hits: dict[str, list[float]] = defaultdict(list)

    def hit(self, key: str, limit: int, window_seconds: int = 60) -> None:
        now = time.monotonic()
        bucket = [t for t in self._hits[key] if now - t < window_seconds]
        if len(bucket) >= limit:
            self._hits[key] = bucket
            raise RateLimited("Muitas tentativas. Aguarde um minuto e tente de novo.")
        bucket.append(now)
        self._hits[key] = bucket

    def reset(self) -> None:
        self._hits.clear()


limiter = FixedWindowLimiter()
