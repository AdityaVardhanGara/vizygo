import random
import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
import models

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USER = 'vizygoin@gmail.com'  # Replace with your Gmail
SMTP_PASSWORD = 'smtp_password'  # Use App Password for Gmail

OTP_TTL_MINUTES = 5

# Generate a 6-digit OTP
def generate_otp():
    return str(random.randint(100000, 999999))

# Send OTP to email
def send_otp_email(email, otp):
    subject = 'Your Vizygo Signup OTP'
    body = f'Your OTP for Vizygo signup is: {otp}\nThis OTP is valid for 5 minutes.'
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = SMTP_USER
    msg['To'] = email
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, [email], msg.as_string())

# Store OTP in DB
def store_otp(db: Session, email: str, otp: str):
    expires_at = datetime.utcnow() + timedelta(minutes=OTP_TTL_MINUTES)
    db_otp = models.OTP(email=email, otp=otp, expires_at=expires_at)
    db.add(db_otp)
    db.commit()
    db.refresh(db_otp)
    return db_otp

# Validate OTP
def validate_otp(db: Session, email: str, otp: str):
    db_otp = db.query(models.OTP).filter(models.OTP.email == email, models.OTP.otp == otp).first()
    if db_otp and db_otp.expires_at > datetime.utcnow():
        db.delete(db_otp)
        db.commit()
        return True
    return False
