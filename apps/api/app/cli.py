"""CLI administrativa local.

Criar membro da equipe Terus (senha lida de TERUS_STAFF_PASSWORD, nunca de argumento):
    TERUS_STAFF_PASSWORD=... python -m app.cli create-staff --email a@b.com --name "Nome" --role terus_admin
"""

import argparse
import asyncio
import os
import sys

from app.core.identity.models import PlatformUser
from app.core.identity.repository import UserRepository
from app.infrastructure.database import dispose_engine, get_sessionmaker
from app.infrastructure.security import hash_password
from app.shared.audit.repository import AuditRepository
from app.shared.enums import PlatformRole
from app.shared.validators import password_problems


async def create_staff(email: str, name: str, role: str) -> None:
    password = os.environ.get("TERUS_STAFF_PASSWORD", "")
    problems = password_problems(password)
    if problems:
        sys.exit("TERUS_STAFF_PASSWORD inválida: " + " ".join(problems))
    async with get_sessionmaker()() as session:
        users = UserRepository(session)
        if await users.get_by_email(email.lower()):
            sys.exit("Já existe usuário com este e-mail.")
        user = await users.add(
            PlatformUser(
                email=email.lower(),
                full_name=name,
                password_hash=hash_password(password),
                role=PlatformRole(role),
            )
        )
        await AuditRepository(session).record(
            "auth.account.created",
            entity="platform_user",
            entity_id=user.id,
            metadata={"role": role},
        )
        await session.commit()
    await dispose_engine()
    print(f"Criado {role}: {email}")


def main() -> None:
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="cmd", required=True)
    staff = sub.add_parser("create-staff")
    staff.add_argument("--email", required=True)
    staff.add_argument("--name", required=True)
    staff.add_argument("--role", choices=["terus_sales", "terus_admin"], required=True)
    args = parser.parse_args()
    if args.cmd == "create-staff":
        asyncio.run(create_staff(args.email, args.name, args.role))


if __name__ == "__main__":
    main()
