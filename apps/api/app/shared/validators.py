"""Validadores puros (sem I/O)."""


def only_digits(value: str) -> str:
    return "".join(ch for ch in value if ch.isdigit())


def is_valid_cnpj(value: str) -> bool:
    """Valida os dígitos verificadores do CNPJ (formato numérico de 14 dígitos)."""
    digits = only_digits(value)
    if len(digits) != 14 or digits == digits[0] * 14:
        return False

    def check_digit(base: str, weights: list[int]) -> str:
        total = sum(int(d) * w for d, w in zip(base, weights, strict=True))
        remainder = total % 11
        return "0" if remainder < 2 else str(11 - remainder)

    first = check_digit(digits[:12], [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
    second = check_digit(digits[:12] + first, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
    return digits[12:] == first + second


def password_problems(password: str) -> list[str]:
    problems = []
    if len(password) < 10:
        problems.append("A senha precisa de pelo menos 10 caracteres.")
    if password.lower() == password or password.upper() == password:
        problems.append("Use letras maiúsculas e minúsculas.")
    if not any(ch.isdigit() for ch in password):
        problems.append("Inclua ao menos um número.")
    return problems
