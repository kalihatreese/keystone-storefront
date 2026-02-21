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

@app.route('/v92-gateway')
def v92_gateway():
    return """
    <div style="background:#000; color:#00ff00; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:monospace;">
        <h1 style="border: 2px solid #00ff00; padding: 20px;">KEYSTONE V92 STOREFRONT</h1>
        <p style="color:#39CCCC;">Resonance Level: Active | Harmonic Flow: 101010</p>
        <a href="/" style="margin-top:20px; color:#fff; text-decoration:none; border:1px solid #fff; padding:10px 20px;">[ RETURN TO CORE ]</a>
        <br>
        <button onclick="alert('Accessing V27 Industrial Backbone...')" style="background:#0074D9; color:white; border:none; padding:15px; cursor:pointer;">PURCHASE V92 LICENSE</button>
    </div>
    """

@app.route('/keystone-v92-store')
def v92_storefront_standalone():
    # This is a standalone fragment for the V27 backbone
    return render_template('storefront.html') 
