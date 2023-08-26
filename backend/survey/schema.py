import email
from datetime import date
from typing import Optional, List
from pydantic import BaseModel, constr, EmailStr


class UserSchema(BaseModel):
    username: str
    email: EmailStr

    class Config:
        orm_mode = True


class SurveyBase(BaseModel):
    id: Optional[int]
    title: str
    description: str

    class Config:
        orm_mode = True


class SurveyUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]

    class Config:
        orm_mode = True


class SurveyList(BaseModel):
    id: int
    title: str
    description: str
    user_id: int
    createdDate: date

    class Config:
        orm_mode = True
