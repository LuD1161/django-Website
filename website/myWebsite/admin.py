from django.contrib import admin

# Register your models here.
from .models import Articles, Requests, Users

admin.site.register(Articles)
admin.site.register(Requests)
admin.site.register(Users)