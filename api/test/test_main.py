from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_version():
    from app.__version__ import __version__ as api_version
    from chesscog import __version__ as chesscog_version
    response = client.get("/version")
    assert response.status_code == 200
    json = response.json()
    assert "app" in json
    assert "api" in json
    assert "chesscog" in json
    assert json["api"] == api_version
    assert json["chesscog"] == chesscog_version
