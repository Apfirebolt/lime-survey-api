from fastapi import HTTPException, status
from typing import List
from sqlalchemy.orm import Session
from backend.auth.models import User
from backend.survey import schema
from . import models
from datetime import datetime


async def create_new_survey(
    request: schema.SurveyBase,
    database: Session,
    current_user: User,
) -> models.Survey:
    new_survey = models.Survey(title=request.title, description=request.description,
                                    user_id=current_user.id, createdDate=datetime.now())
    database.add(new_survey)
    database.commit()
    database.refresh(new_survey)
    return new_survey


async def get_survey_listing(database: Session) -> List[models.Survey]:
    surveys = database.query(models.Survey).all()
    return surveys

async def get_my_survey_listing(database: Session, current_user: int) -> List[models.Survey]:
    surveys = database.query(models.Survey).filter_by(user_id=current_user).all()
    return surveys


async def get_survey_by_id(survey_id: int, current_user: int, database: Session) -> models.Survey:
    survey = database.query(models.Survey).filter_by(id=survey_id).first()
    if not survey:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="survey Not Found !"
        )
    return survey


async def delete_survey_by_id(survey_id: int, database: Session) -> None:
    database.query(models.Survey).filter(
        models.Survey.id == survey_id).delete()
    database.commit()


async def update_survey_by_id(
    request: schema.SurveyUpdate,
    survey_id: int,
    current_user: int,
    database: Session,
) -> models.Survey:
    survey = database.query(models.Survey).filter_by(id=survey_id, user_id=current_user).first()
    if not survey:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="survey Not Found !"
        )
    survey.title = request.title if request.title else survey.title
    survey.description = request.description if request.description else survey.description
    database.commit()
    database.refresh(survey)
    return survey



