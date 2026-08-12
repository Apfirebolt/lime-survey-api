from fastapi import HTTPException, status
from typing import List
from sqlalchemy.orm import Session
from backend.survey import models
from backend.auth.models import User
from backend.questions import schema
from datetime import datetime


async def create_new_question(
    request: schema.QuestionBase,
    database: Session,
    current_user: User,
) -> models.Question:
    new_question = models.Question(questionText=request.questionText,
                                    survey_id=request.survey_id, createdDate=datetime.now())
    database.add(new_question)
    database.commit()
    database.refresh(new_question)
    return new_question


async def get_question_listing(database: Session, current_user: int) -> List[models.Question]:
    questions = database.query(models.Question).all()
    return questions


async def get_question_by_id(question_id: int, current_user: int, database: Session) -> models.Question:
    question = database.query(models.Question).filter_by(id=question_id).first()
    if not question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Question Not Found !"
        )
    return question


async def delete_question_by_id(question_id: int, database: Session) -> None:
    database.query(models.Question).filter(
        models.Question.id == question_id).delete()
    database.commit()


async def update_question_by_id(
    request: schema.QuestionUpdate,
    question_id: int,
    current_user: int,
    database: Session,
) -> models.Question:
    question = database.query(models.Question).filter_by(id=question_id).first()
    if not question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="survey Not Found !"
        )
    question.questionText = request.questionText if request.questionText else question.questionText
    database.commit()
    database.refresh(question)
    return question






