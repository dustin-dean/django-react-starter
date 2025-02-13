from django.contrib import admin

# Register your models here.
from .models import BaseUser


@admin.register(BaseUser)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "first_name", "last_name", "is_staff")
    search_fields = ("username", "email", "first_name", "last_name")
