from typing import List
from fastapi import APIRouter, Depends, status, Response, Request
from sqlalchemy.orm import Session
from backend.auth.jwt import get_current_user
from backend.auth.models import User

from backend import db

from .import schema
from .import services


router = APIRouter(
    tags=["Question"],
    prefix='/question'
)


@router.post('/', status_code=status.HTTP_201_CREATED,
             response_model=schema.QuestionBase)
async def create_new_question(request: schema.QuestionBase, database: Session = Depends(db.get_db), 
    current_user: User = Depends(get_current_user)):
    user = database.query(User).filter(User.email == current_user.email).first()
    result = await services.create_new_question(request, database, user)
    return result


@router.get('/', status_code=status.HTTP_200_OK,
            response_model=List[schema.QuestionList])
async def question_list(database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):
    result = await services.get_question_listing(database, current_user.id)
    return result


@router.get('/{question_id}', status_code=status.HTTP_200_OK, response_model=schema.QuestionBase)
async def get_question_by_id(question_id: int, database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):                            
    return await services.get_question_by_id(question_id, current_user.id, database)


@router.delete('/{question_id}', status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
async def delete_question_by_id(question_id: int,
                                database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):
    return await services.delete_question_by_id(question_id, database)


@router.patch('/{question_id}', status_code=status.HTTP_200_OK, response_model=schema.QuestionBase)
async def update_question_by_id(request: schema.QuestionUpdate, question_id: int, database: Session = Depends(db.get_db),
                                current_user: User = Depends(get_current_user)):                            
    return await services.update_question_by_id(request, question_id, current_user.id, database)
