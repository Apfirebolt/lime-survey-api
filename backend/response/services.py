from fastapi import HTTPException, status
from typing import List
from . import models
from datetime import datetime


async def create_new_response(request, database, current_user) -> models.UserResponse:
    new_response = models.UserResponse(response=request.response, survey_id=request.survey_id,
                                    user_id=current_user.id, createdDate=datetime.now())
    database.add(new_response)
    database.commit()
    database.refresh(new_response)
    return new_response


async def get_response_listing(database, current_user) -> List[models.UserResponse]:
    responses = database.query(models.UserResponse).all()
    return responses


async def get_response_by_id(response_id, current_user, database):
    response = database.query(models.UserResponse).filter_by(id=response_id).first()
    if not response:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Response Not Found !"
        )
    return response


async def delete_response_by_id(response_id, database):
    database.query(models.UserResponse).filter(
        models.UserResponse.id == response_id).delete()
    database.commit()










