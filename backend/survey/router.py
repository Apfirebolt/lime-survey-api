from typing import List
from fastapi import APIRouter, Depends, status, Response, Request
from sqlalchemy.orm import Session
from backend.auth.jwt import get_current_user
from backend.auth.models import User

from backend import db

from .import schema
from .import services


router = APIRouter(
    tags=["Survey"],
    prefix='/survey'
)


@router.post('/', status_code=status.HTTP_201_CREATED,
             response_model=schema.SurveyBase)
async def create_new_survey(request: schema.SurveyBase, database: Session = Depends(db.get_db), 
    current_user: User = Depends(get_current_user)):
    user = database.query(User).filter(User.email == current_user.email).first()
    result = await services.create_new_survey(request, database, user)
    return result


@router.get('/', status_code=status.HTTP_200_OK,
            response_model=List[schema.SurveyList])
async def survey_list(database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):
    result = await services.get_survey_listing(database, current_user.id)
    return result


@router.get('/{survey_id}', status_code=status.HTTP_200_OK, response_model=schema.SurveyBase)
async def get_survey_by_id(survey_id: int, database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):                            
    return await services.get_survey_by_id(survey_id, current_user.id, database)


@router.delete('/{survey_id}', status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
async def delete_survey_by_id(survey_id: int,
                                database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):
    return await services.delete_survey_by_id(survey_id, database)


@router.patch('/{survey_id}', status_code=status.HTTP_200_OK, response_model=schema.SurveyBase)
async def update_survey_by_id(request: schema.SurveyUpdate, survey_id: int, database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):                            
    return await services.update_survey_by_id(request, survey_id, current_user.id, database)
