from datetime import date
from typing import Optional, List
from pydantic import BaseModel
from backend.options.schema import OptionList


class QuestionBase(BaseModel):
    id: Optional[int]
    questionText: str
    survey_id: int
    options: Optional[List[OptionList]]


    class Config:
        orm_mode = True


class QuestionUpdate(BaseModel):
    questionText: Optional[str]

    class Config:
        orm_mode = True


class QuestionList(BaseModel):
    id: int
    questionText: str
    createdDate: date

    class Config:
        orm_mode = True
