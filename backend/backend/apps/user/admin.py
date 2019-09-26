from django.apps import apps, AppConfig
from django.contrib import admin
from .models import User
from backend.apps.advertisements.models import Advertisement

@admin.register(User, Advertisement)
class UserAdmin(admin.ModelAdmin):
    pass
