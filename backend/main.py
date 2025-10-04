# Get all stories endpoint
from typing import List
from schemas import StoryCreate, StoryOut
from pydantic import BaseModel, EmailStr
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
import models, schemas, crud
import chatbot
from database import SessionLocal, engine
import otp_utils

models.Base.metadata.create_all(bind=engine)


# Pydantic model for OTP send request
class OTPSendRequest(BaseModel):
    email: EmailStr


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(chatbot.router)
# Allow CORS for frontend (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Send OTP to email (for login/signup)
@app.post("/send-otp")
def send_otp(data: OTPSendRequest, db: Session = Depends(get_db)):
    otp = otp_utils.generate_otp()
    try:
        otp_utils.store_otp(db, data.email, otp)
        otp_utils.send_otp_email(data.email, otp)
        return {"success": True, "message": "OTP sent to your email."}
    except Exception as e:
        return {"success": False, "message": f"Failed to send OTP: {e}"}
# Signup: create user (inactive), send OTP to email, store OTP
@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_username(db, user.username) or crud.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Username or email already registered")
    otp = otp_utils.generate_otp()
    otp_utils.store_otp(db, user.email, otp)
    try:
        otp_utils.send_otp_email(user.email, otp)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send OTP: {e}")
    # Temporarily store user data in DB with a flag or in-memory (for demo, skip user creation until OTP verified)
    return {"msg": "OTP sent to your email. Please verify to complete signup."}

# OTP verification endpoint
@app.post("/verify-otp", response_model=schemas.UserOut)
def verify_otp(otp_data: schemas.OTPVerify, db: Session = Depends(get_db)):
    # Validate OTP
    if not otp_utils.validate_otp(db, otp_data.email, otp_data.otp):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    # Check if user already exists
    user = crud.get_user_by_email(db, otp_data.email)
    if user:
        return user

    # Create user with all info from frontend (password will be encrypted in crud.create_user)
    new_user = crud.create_user(db, schemas.UserCreate(
        username=otp_data.username,
        email=otp_data.email,
        password=otp_data.password,
        first_name=getattr(otp_data, 'first_name', None),
        last_name=getattr(otp_data, 'last_name', None),
        phone_number=getattr(otp_data, 'phone_number', None),
        occupation=getattr(otp_data, 'occupation', None),
        city=getattr(otp_data, 'city', None),
        gender=getattr(otp_data, 'gender', None),
        date_of_birth=getattr(otp_data, 'date_of_birth', None)
    ))
    return new_user


# Login: email or username + password
@app.post("/login", response_model=schemas.UserOut)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    # Accept both email and username, prefer email if provided
    identifier = getattr(user, 'email', None) or getattr(user, 'username', None)
    if not identifier:
        raise HTTPException(status_code=400, detail="Email or username required")
    if getattr(user, 'email', None):
        db_user = crud.get_user_by_email(db, user.email)
    else:
        db_user = crud.get_user_by_username(db, user.username)
    if not db_user or not crud.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return db_user

# Create story endpoint
@app.post("/stories")
def create_story(story: StoryCreate, db: Session = Depends(get_db)):
    new_story = crud.create_story(db, story)
    return {"success": True, "story_id": new_story.id}

@app.get("/stories", response_model=List[StoryOut])
def get_stories(db: Session = Depends(get_db)):
    return crud.get_all_stories(db)
from schemas import StoryCreate