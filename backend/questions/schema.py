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
        from_attributes = True


class QuestionUpdate(BaseModel):
    questionText: Optional[str]

    class Config:
        from_attributes = True


class QuestionList(BaseModel):
    id: int
    questionText: str
    createdDate: date

    class Config:
        from_attributes = True
