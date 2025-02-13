from ninja import Router
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.http import HttpRequest
from ninja.security import django_auth
from django.middleware.csrf import get_token
from .schema import UserOut, LoginIn, RegisterIn, MessageOut


router = Router()


@router.post("/register", response={201: UserOut, 400: MessageOut})
def register(request, data: RegisterIn):
    if User.objects.filter(username=data.username).exists():
        return 400, {"detail": "Username already exists"}

    if User.objects.filter(email=data.email).exists():
        return 400, {"detail": "Email already exists"}

    user = User.objects.create_user(
        username=data.username,
        email=data.email,
        password=data.password,
        first_name=data.first_name or "",
        last_name=data.last_name or "",
    )

    login(request, user)
    return 201, user


@router.post("/login", response={200: UserOut, 400: MessageOut})
def login_user(request, data: LoginIn):
    user = authenticate(username=data.username, password=data.password)
    if user is None:
        return 400, {
            "detail": "Invalid credentials. Please check your email and password."
        }

    login(request, user)
    return 200, user


@router.post("/logout", response={200: MessageOut}, auth=django_auth)
def logout_user(request):
    logout(request)
    return {"detail": "Successfully logged out"}


@router.get("/user", response={200: UserOut, 401: MessageOut}, auth=django_auth)
def get_user(request):
    return request.user


@router.get("/csrf", response={200: MessageOut})
def get_csrf_token(request: HttpRequest):
    token = get_token(request)
    return {"detail": token}
