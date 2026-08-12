from datetime import date
from typing import Optional, List
from pydantic import BaseModel


class OptionBase(BaseModel):
    id: Optional[int]
    optionText: str
    question_id: int

    class Config:
        from_attributes = True


class OptionUpdate(BaseModel):
    optionText: Optional[str]

    class Config:
        from_attributes = True


class OptionList(BaseModel):
    id: int
    optionText: str
    createdDate: date
    question_id: int

    class Config:
        from_attributes = True
