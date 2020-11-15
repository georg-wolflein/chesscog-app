from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_version():
    from app.__version__ import __version__ as api_version
    from chesscog import __version__ as chesscog_version
    response = client.get("/version")
    assert response.status_code == 200
    assert response.json() == dict(api=api_version, chesscog=chesscog_version)
