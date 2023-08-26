from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from backend.auth import router as auth_router
from backend.survey import router as survey_router
from backend.questions import router as question_router
from backend.options import router as option_router

app = FastAPI(title="Fast API Survey",
    docs_url="/lime-survey-docs",
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

# app.mount("/static", StaticFiles(directory="frontend/build/static"), name="static")

# templates = Jinja2Templates(directory="frontend/build")


# @app.get("/{full_path:path}")
# async def serve_react_app(request: Request, full_path: str):
#     """Serve the react app
#     `full_path` variable is necessary to serve each possible endpoint with
#     `index.html` file in order to be compatible with `react-router-dom
#     """
#     return templates.TemplateResponse("index.html", {"request": request})


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
 
