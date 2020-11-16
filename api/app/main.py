from fastapi import FastAPI, File, HTTPException
from fastapi.responses import RedirectResponse
import cv2
import numpy as np
from enum import Enum
import chess
from pydantic import BaseModel
import typing
import logging

from chesscog import __version__ as chesscog_version
from chesscog.recognition import ChessRecognizer

try:
    from .__version__ import __version__ as api_version
except ImportError:
    from __version__ import __version__ as api_version

app = FastAPI(title="Chess Recognition API",
              version=api_version,
              root_path="/api")

try:
    recognizer = ChessRecognizer()
except Exception as e:
    logging.error(f"Failed to load chess recognizer: {e}")
    recognizer = None


class Turn(str, Enum):
    WHITE = "white"
    BLACK = "black"


class Version(BaseModel):
    api: str
    chesscog: str


class Prediction(BaseModel):
    fen: str
    corners: typing.List[typing.List[int]]


@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse("docs")


@app.get("/version", response_model=Version, summary="Obtain version information")
def version() -> Version:
    return Version(api=api_version, chesscog=chesscog_version)


@app.post("/predict", response_model=Prediction, summary="Perform inference")
def read_item(turn: Turn = Turn.WHITE, file: bytes = File(...)) -> Prediction:
    if not recognizer:
        raise HTTPException(status_code=501, detail="Chesscog not loaded")
    buffer = np.frombuffer(file, np.uint8)
    img = cv2.imdecode(buffer, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    board, corners = recognizer.predict(img, turn == Turn.WHITE)
    fen = board.board_fen()
    return Prediction(fen=fen,
                      corners=corners.tolist())
