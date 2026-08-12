from datetime import date
from typing import Optional, List
from pydantic import BaseModel, constr, EmailStr
from backend.questions.schema import QuestionBase


class UserSchema(BaseModel):
    username: str
    email: EmailStr

    class Config:
        from_attributes = True


class SurveyBase(BaseModel):
    id: Optional[int]
    title: str
    description: str
    questions: Optional[List[QuestionBase]]

    class Config:
        from_attributes = True


class SurveyUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]

    class Config:
        from_attributes = True


class SurveyList(BaseModel):
    id: int
    title: str
    description: str
    user_id: int
    createdDate: date
    questions: List[QuestionBase]
    owner: UserSchema

    class Config:
        from_attributes = True
