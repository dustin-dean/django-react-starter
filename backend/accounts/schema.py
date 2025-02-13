from ninja import Schema
from typing import Optional


class AuthBase(Schema):
    """Base schema for authentication related data"""

    pass


class UserOut(AuthBase):
    """Schema for user output data"""

    id: int
    username: str
    email: str
    first_name: str
    last_name: str


class LoginIn(AuthBase):
    """Schema for login input data"""

    username: str
    password: str


class RegisterIn(AuthBase):
    """Schema for registration input data"""

    username: str
    password: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class MessageOut(AuthBase):
    """Schema for message responses"""

    detail: str
