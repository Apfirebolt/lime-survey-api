from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from backend.auth import router as auth_router
from backend.survey import router as survey_router
from backend.questions import router as question_router
from backend.options import router as option_router
from backend.response import router as response_router

app = FastAPI(title="Fast API Survey",
    docs_url="/docs",
    version="0.0.1")

origins = ["http://localhost:3000",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router.router)
app.include_router(survey_router.router)
app.include_router(question_router.router)
app.include_router(option_router.router)
app.include_router(response_router.router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
 
