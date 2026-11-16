"""Jornada do cliente: organizações, perfil, solicitação comercial e portal."""

import uuid

from fastapi import APIRouter, status

from app.api.deps import CurrentUser, UoW
from app.api.mappers import journey_out
from app.api.schemas.onboarding import (
    CommercialRequestBody,
    JourneyListOut,
    JourneyOut,
    OrganizationRequest,
    ProfileRequest,
)
from app.core.acquisition.qualification import ProfileAnswers
from app.core.acquisition.service import AcquisitionService
from app.core.acquisition.use_cases import CommercialInput, OrganizationInput

router = APIRouter(prefix="/v1/organizations", tags=["onboarding"])


def _org_input(body: OrganizationRequest) -> OrganizationInput:
    return OrganizationInput(**body.model_dump(exclude={"source"}))


@router.get("", response_model=JourneyListOut)
async def list_my_organizations(user: CurrentUser, uow: UoW) -> JourneyListOut:
    views = await AcquisitionService(uow).list_my_organizations(user)
    return JourneyListOut(items=[journey_out(v) for v in views])


@router.post("", response_model=JourneyOut, status_code=status.HTTP_201_CREATED)
async def create_organization(body: OrganizationRequest, user: CurrentUser, uow: UoW) -> JourneyOut:
    source = body.source.model_dump(exclude_none=True) if body.source else None
    view = await AcquisitionService(uow).create_organization(user, _org_input(body), source)
    return journey_out(view)


@router.get("/{tenant_id}", response_model=JourneyOut)
async def get_journey(tenant_id: uuid.UUID, user: CurrentUser, uow: UoW) -> JourneyOut:
    return journey_out(await AcquisitionService(uow).get_journey(user, tenant_id))


@router.put("/{tenant_id}", response_model=JourneyOut)
async def update_organization(
    tenant_id: uuid.UUID, body: OrganizationRequest, user: CurrentUser, uow: UoW
) -> JourneyOut:
    view = await AcquisitionService(uow).update_organization(user, tenant_id, _org_input(body))
    return journey_out(view)


@router.put("/{tenant_id}/profile", response_model=JourneyOut)
async def save_profile(
    tenant_id: uuid.UUID, body: ProfileRequest, user: CurrentUser, uow: UoW
) -> JourneyOut:
    answers = ProfileAnswers(**body.model_dump(exclude={"notes"}))
    view = await AcquisitionService(uow).save_profile(user, tenant_id, answers, body.notes)
    return journey_out(view)


@router.post(
    "/{tenant_id}/commercial-requests",
    response_model=JourneyOut,
    status_code=status.HTTP_201_CREATED,
)
async def request_commercial(
    tenant_id: uuid.UUID, body: CommercialRequestBody, user: CurrentUser, uow: UoW
) -> JourneyOut:
    view = await AcquisitionService(uow).request_commercial(
        user, tenant_id, CommercialInput(**body.model_dump())
    )
    return journey_out(view)
