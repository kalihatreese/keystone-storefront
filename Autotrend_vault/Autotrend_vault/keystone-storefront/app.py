from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import time, hmac, hashlib, os

APP_VER = "1.0.1"
SECRET = os.environ.get("KSL_SECRET", "dev-secret")

app = FastAPI(title="Keystone Licensing", version=APP_VER)

class KeyRequest(BaseModel):
    email: EmailStr

def make_key(email: str) -> str:
    digest = hmac.new(SECRET.encode(), email.lower().encode(), hashlib.sha256).hexdigest()[:20].upper()
    return f"KSL-{digest[:4]}-{digest[4:8]}-{digest[8:12]}-{digest[12:16]}"

@app.get("/health")
def health():
    return {"ok": True, "service": "licensing", "version": APP_VER, "ts": int(time.time())}

@app.post("/key")
def key(req: KeyRequest):
    return {"email": req.email, "key": make_key(req.email)}

@app.get("/verify")
def verify(email: EmailStr, key: str):
    expected = make_key(email)
    if not hmac.compare_digest(expected, key):
        raise HTTPException(status_code=400, detail="invalid key")
    return {"ok": True, "email": email, "key": key}
