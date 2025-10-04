from typing import Optional
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    first_name: str = None
    last_name: str = None
    phone_number: str = None
    occupation: str = None
    city: str = None
    gender: str = None
    date_of_birth: str = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str

# For OTP verification
class OTPVerify(BaseModel):
    email: EmailStr
    otp: str
    username: str
    password: str
    first_name: str = None
    last_name: str = None
    phone_number: str = None
    occupation: str = None
    city: str = None
    gender: str = None
    date_of_birth: str = None

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    first_name: str = None
    last_name: str = None
    phone_number: str = None
    occupation: str = None
    city: str = None
    gender: str = None
    date_of_birth: str = None

    class Config:
        orm_mode = True


class StoryCreate(BaseModel):
    title: str
    content: str
    author: str
    location: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None

# Story output schema
class StoryOut(BaseModel):
    id: int
    title: str
    content: str
    author: str
    location: str = None
    category: str = None
    image_url: str = None

    class Config:
        orm_mode = True