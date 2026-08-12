from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict, EmailStr
from backend.questions.schema import QuestionBase


class UserSchema(BaseModel):
    username: str
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)


class SurveyBase(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    questions: Optional[List[QuestionBase]] = None

    model_config = ConfigDict(from_attributes=True)


class SurveyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class SurveyList(BaseModel):
    id: int
    title: str
    description: str
    user_id: int
    createdDate: datetime
    questions: List[QuestionBase]
    owner: UserSchema

    model_config = ConfigDict(from_attributes=True)