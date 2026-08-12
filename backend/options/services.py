from datetime import datetime
from typing import List

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from backend.auth.models import User
from backend.options import schema
from backend.survey import models


async def create_new_option(
    request: schema.OptionBase,
    database: Session,
    current_user: User,
) -> models.Option:
    new_option = models.Option(
        optionText=request.optionText,
        question_id=request.question_id,
        createdDate=datetime.now(),
    )
    database.add(new_option)
    database.commit()
    database.refresh(new_option)
    return new_option


async def get_option_listing(database: Session, current_user: User) -> List[models.Option]:
    options = database.query(models.Option).all()
    return options


async def get_option_by_id(option_id: int, current_user: int, database: Session) -> models.Option:
    option = database.query(models.Option).filter_by(id=option_id).first()
    if not option:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Option Not Found !"
        )
    return option


async def delete_option_by_id(option_id: int, database: Session) -> None:
    database.query(models.Option).filter(
        models.Option.id == option_id).delete()
    database.commit()


async def update_option_by_id(
    request: schema.OptionUpdate,
    option_id: int,
    current_user: int,
    database: Session,
) -> models.Option:
    option = database.query(models.Option).filter_by(id=option_id).first()
    if not option:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="survey Not Found !"
        )
    option.optionText = request.optionText if request.optionText else option.optionText
    database.commit()
    database.refresh(option)
    return option

