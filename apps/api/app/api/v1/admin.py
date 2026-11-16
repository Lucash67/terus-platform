"""Painel interno da equipe Terus: leads, solicitações, responsáveis e histórico."""

import uuid
from typing import Annotated

from fastapi import APIRouter, Query, status

from app.api.deps import CurrentUser, UoW
from app.api.mappers import lead_detail_out, lead_out
from app.api.schemas.admin import (
    AssignBody,
    FunnelOut,
    LeadDetailOut,
    LeadPage,
    NoteBody,
    StaffOut,
    StatusChangeRequest,
)
from app.core.acquisition.service import AcquisitionService
from app.shared.enums import JourneyStatus

router = APIRouter(prefix="/v1/admin", tags=["admin"])


@router.get("/leads", response_model=LeadPage)
async def list_leads(
    user: CurrentUser,
    uow: UoW,
    status_filter: Annotated[JourneyStatus | None, Query(alias="status")] = None,
    q: Annotated[str | None, Query(max_length=100)] = None,
    assigned_to: uuid.UUID | None = None,
    page: Annotated[int, Query(ge=1)] = 1,
    page_size: Annotated[int, Query(ge=1, le=100)] = 20,
) -> LeadPage:
    items, total = await AcquisitionService(uow).list_leads(
        user, status=status_filter, query=q, assigned_to=assigned_to, page=page, page_size=page_size
    )
    return LeadPage(items=[lead_out(i) for i in items], total=total, page=page, page_size=page_size)


@router.get("/funnel", response_model=FunnelOut)
async def funnel(user: CurrentUser, uow: UoW) -> FunnelOut:
    return FunnelOut(counts=await AcquisitionService(uow).funnel(user))


@router.get("/staff", response_model=list[StaffOut])
async def staff(user: CurrentUser, uow: UoW) -> list[StaffOut]:
    members = await AcquisitionService(uow).list_staff(user)
    return [
        StaffOut(id=m.id, full_name=m.full_name, email=m.email, role=m.role.value) for m in members
    ]


@router.get("/leads/{tenant_id}", response_model=LeadDetailOut)
async def lead_detail(tenant_id: uuid.UUID, user: CurrentUser, uow: UoW) -> LeadDetailOut:
    return lead_detail_out(await AcquisitionService(uow).lead_detail(user, tenant_id))


@router.post("/commercial-requests/{request_id}/status", response_model=LeadDetailOut)
async def change_status(
    request_id: uuid.UUID, body: StatusChangeRequest, user: CurrentUser, uow: UoW
) -> LeadDetailOut:
    service = AcquisitionService(uow)
    tenant_id = await service.change_request_status(
        user, request_id, body.to_status, body.note, body.contract_evidence
    )
    return lead_detail_out(await service.lead_detail(user, tenant_id))


@router.post("/commercial-requests/{request_id}/assign", response_model=LeadDetailOut)
async def assign(
    request_id: uuid.UUID, body: AssignBody, user: CurrentUser, uow: UoW
) -> LeadDetailOut:
    service = AcquisitionService(uow)
    tenant_id = await service.assign_request(user, request_id, body.assignee_id)
    return lead_detail_out(await service.lead_detail(user, tenant_id))


@router.post("/commercial-requests/{request_id}/notes", status_code=status.HTTP_204_NO_CONTENT)
async def add_note(request_id: uuid.UUID, body: NoteBody, user: CurrentUser, uow: UoW) -> None:
    await AcquisitionService(uow).add_note(user, request_id, body.note, body.visible_to_customer)
