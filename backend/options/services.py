from fastapi import HTTPException, status
from typing import List
from backend.survey import models
from datetime import datetime


async def create_new_option(request, database, current_user) -> models.Option:
    new_option = models.Option(optionText=request.optionText,
                                    question_id=request.question_id, createdDate=datetime.now())
    database.add(new_option)
    database.commit()
    database.refresh(new_option)
    return new_option


async def get_option_listing(database, current_user) -> List[models.Option]:
    options = database.query(models.Option).all()
    return options


async def get_option_by_id(option_id, current_user, database):
    option = database.query(models.Option).filter_by(id=option_id).first()
    if not option:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Option Not Found !"
        )
    return option


async def delete_option_by_id(option_id, database):
    database.query(models.Option).filter(
        models.Option.id == option_id).delete()
    database.commit()


async def update_option_by_id(request, option_id, current_user, database):
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






