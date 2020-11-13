from fastapi import FastAPI, File
from fastapi.responses import RedirectResponse
import cv2
import numpy as np
from enum import Enum
import chess
from pydantic import BaseModel

from chesscog import __version__ as chesscog_version
from chesscog.recognition import ChessRecognizer

from __version__ import __version__ as api_version

app = FastAPI(title="Chess Recognition API", version=api_version)
recognizer = ChessRecognizer()


class Turn(str, Enum):
    WHITE = "white"
    BLACK = "black"


class Prediction(BaseModel):
    fen: str
    lichess_url: str


@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse("docs")

@app.get("/version")
def version():
    return {"api": api_version, "chesscog": chesscog_version}


@app.post("/predict", response_model=Prediction)
def read_item(turn: Turn = Turn.WHITE, file: bytes = File(...)):
    buffer = np.frombuffer(file, np.uint8)
    img = cv2.imdecode(buffer, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    board = recognizer.predict(img, turn == Turn.WHITE)
    fen = board.board_fen()
    return Prediction(fen=fen,
                      lichess_url=f"https://lichess.org/editor/{fen}")
