from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from backend.auth.jwt import get_current_user
from backend.auth.models import User

from backend import db

from .import schema
from .import services


router = APIRouter(
    tags=["Response"],
    prefix='/response'
)


@router.post('/', status_code=status.HTTP_201_CREATED,
             response_model=schema.UserResponseBase)
async def create_new_response(request: schema.UserResponseBase, database: Session = Depends(db.get_db), 
    current_user: User = Depends(get_current_user)):
    user = database.query(User).filter(User.email == current_user.email).first()
    result = await services.create_new_response(request, database, user)
    return result


@router.get('/', status_code=status.HTTP_200_OK,
            response_model=List[schema.UserResponseList])
async def response_list(database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):
    result = await services.get_response_listing(database, current_user.id)
    return result


@router.get('/{response_id}', status_code=status.HTTP_200_OK, response_model=schema.UserResponseBase)
async def get_response_by_id(survey_id: int, database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):                            
    return await services.get_response_by_id(survey_id, current_user.id, database)
