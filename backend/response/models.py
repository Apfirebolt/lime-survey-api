from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, ForeignKey, DateTime, Integer, JSON


from backend.db import Base


class UserResponse(Base):
    __tablename__ = "user_response"

    id = Column(Integer, primary_key=True, autoincrement=True)
    createdDate = Column(DateTime, default=datetime.now)
    survey_id = Column(Integer, ForeignKey("survey.id", ondelete="CASCADE"))
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))
    response = Column(JSON, nullable=False, server_default='{}')

    # survey relationship
    survey = relationship("Survey", back_populates="user_responses")
                      
    



