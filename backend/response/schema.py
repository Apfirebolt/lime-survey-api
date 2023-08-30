from datetime import date
from typing import Optional, List
from pydantic import BaseModel, constr, EmailStr, json
from backend.survey.schema import SurveyBase


class UserSchema(BaseModel):
    username: str
    email: EmailStr

    class Config:
        orm_mode = True


class UserResponseBase(BaseModel):
    id: Optional[int]
    survey_id: str
    response: str

    class Config:
        orm_mode = True


class UserResponseList(BaseModel):
    id: int
    survey_id: int
    user_id: int
    createdDate: date
    response: str

    class Config:
        orm_mode = True
