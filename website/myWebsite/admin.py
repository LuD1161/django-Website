from django.contrib import admin

# Register your models here.
from .models import Requests, Users

admin.site.register(Requests)
admin.site.register(Users)