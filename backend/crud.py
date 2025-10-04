
from sqlalchemy.orm import Session
import models
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user_create):
    hashed_password = pwd_context.hash(user_create.password)
    db_user = models.User(
        username=user_create.username,
        email=user_create.email,
        hashed_password=hashed_password,
        first_name=getattr(user_create, 'first_name', None),
        last_name=getattr(user_create, 'last_name', None),
        phone_number=getattr(user_create, 'phone_number', None),
        occupation=getattr(user_create, 'occupation', None),
        city=getattr(user_create, 'city', None),
        gender=getattr(user_create, 'gender', None),
        date_of_birth=getattr(user_create, 'date_of_birth', None)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Story CRUD
def create_story(db: Session, story_create):
    story = models.Story(
        title=story_create.title,
        content=story_create.content,
        author=story_create.author,
        location=getattr(story_create, 'location', None),
        category=getattr(story_create, 'category', None),
        image_url=getattr(story_create, 'image_url', None)
    )
    db.add(story)
    db.commit()
    db.refresh(story)
    return story

# Get all stories
def get_all_stories(db: Session):
    return db.query(models.Story).all()