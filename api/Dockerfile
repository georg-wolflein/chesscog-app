FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

# Set environment variables
env MAX_WORKERS 1
env WEB_CONCURRENCY 1

# OpenGL is needed for OpenCV
RUN apt update && apt install -y libgl1-mesa-glx

# Install poetry
RUN pip install --upgrade pip && \
    pip install poetry && \
    poetry config virtualenvs.create false

# Install dependencies
COPY ./pyproject.toml ./poetry.lock* /app/
RUN poetry install --no-root --no-dev

# Download models
RUN poetry run python -m chesscog.occupancy_classifier.download_model && \
    poetry run python -m chesscog.piece_classifier.download_model

# Copy the app
COPY ./app /app
