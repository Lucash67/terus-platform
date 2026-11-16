from app.core.acquisition.qualification import ProfileAnswers, qualify, recommend
from app.shared.validators import is_valid_cnpj, password_problems
from tests.factories import make_cnpj


def test_cnpj_validation() -> None:
    assert is_valid_cnpj(make_cnpj("112223330001"))
    assert is_valid_cnpj("11.222.333/0001-81")
    assert not is_valid_cnpj("11.222.333/0001-80")
    assert not is_valid_cnpj("00000000000000")
    assert not is_valid_cnpj("123")


def test_password_rules() -> None:
    assert password_problems("SenhaForte123") == []
    assert password_problems("fraca")


def test_qualification_is_explainable_and_bounded() -> None:
    q = qualify(
        ProfileAnswers(
            "rms",
            None,
            "51+",
            ["ruptura", "excesso", "metas", "producao", "exposicao"],
            True,
            "imediato",
        )
    )
    assert q.score == 100 and q.band == "alta"
    assert sum(r.points for r in q.reasons) >= q.score
    low = qualify(ProfileAnswers("outro", "Próprio", "1", ["metas"], False, "explorando"))
    assert low.band == "inicial"
    assert all(r.explanation for r in low.reasons)


def test_recommendations_follow_priorities_without_duplicates() -> None:
    recs = recommend(["ruptura", "execucao_loja", "fornecedores"])
    assert [r.module for r in recs] == ["alert", "task", "order", "chain"]
