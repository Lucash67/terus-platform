"""Adaptador de e-mail.

Não há provedor de e-mail contratado/configurado. O backend padrão
`not_configured` NÃO envia nada e informa isso a quem chamou — a interface
mostra a pendência em vez de dizer "e-mail enviado". O backend `memory`
existe apenas para testes automatizados do fluxo completo.
"""

from dataclasses import dataclass, field
from typing import Literal, Protocol

from app.settings import get_settings

DeliveryStatus = Literal["sent", "not_configured"]


@dataclass(frozen=True)
class OutgoingEmail:
    to: str
    subject: str
    body: str


class Mailer(Protocol):
    backend: str

    async def send(self, message: OutgoingEmail) -> DeliveryStatus: ...


class NotConfiguredMailer:
    backend = "not_configured"

    async def send(self, message: OutgoingEmail) -> DeliveryStatus:
        return "not_configured"


@dataclass
class MemoryMailer:
    backend: str = "memory"
    outbox: list[OutgoingEmail] = field(default_factory=list)

    async def send(self, message: OutgoingEmail) -> DeliveryStatus:
        self.outbox.append(message)
        return "sent"


_memory_mailer = MemoryMailer()


def get_mailer() -> Mailer:
    if get_settings().mailer_backend == "memory":
        return _memory_mailer
    return NotConfiguredMailer()


def get_memory_outbox() -> list[OutgoingEmail]:
    return _memory_mailer.outbox
