from datetime import date
from typing import Optional, List
from pydantic import BaseModel, constr, EmailStr
from backend.survey.schema import SurveyBase


class UserSchema(BaseModel):
    username: str
    email: EmailStr

    class Config:
        from_attributes = True


class UserResponseBase(BaseModel):
    id: Optional[int]
    survey_id: str
    response: str

    class Config:
        from_attributes = True


class UserResponseList(BaseModel):
    id: int
    survey_id: int
    survey: SurveyBase
    user_id: int
    createdDate: date
    response: str

    class Config:
        from_attributes = True
