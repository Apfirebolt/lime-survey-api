from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, ForeignKey, Text, DateTime, Integer


from backend.db import Base


class Survey(Base):
    __tablename__ = "survey"

    id = Column(Integer, primary_key=True, autoincrement=True)
    createdDate = Column(DateTime, default=datetime.now)
    title = Column(String(50))
    description = Column(Text)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))

    # A user has multiple surveys, FK to link them
    owner = relationship("User", back_populates="surveys")
    questions = relationship("Question", back_populates="survey")


class Question(Base):
    __tablename__ = "question"

    id = Column(Integer, primary_key=True, autoincrement=True)
    questionText = Column(String(100))
    createdDate = Column(DateTime, default=datetime.now)
    survey_id = Column(Integer, ForeignKey("survey.id", ondelete="CASCADE"))

    options = relationship("Option", back_populates="question")
    # A survey has multiple questions, FK to link them
    survey = relationship("Survey", back_populates="questions")


class Option(Base):
    __tablename__ = "option"

    id = Column(Integer, primary_key=True, autoincrement=True)
    optionText = Column(String(100))
    createdDate = Column(DateTime, default=datetime.now)
    question_id = Column(Integer, ForeignKey("question.id", ondelete="CASCADE"))

    # A question has multiple options, FK to link them
    question = relationship("Question", back_populates="options")



