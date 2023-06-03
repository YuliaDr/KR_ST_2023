from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
from kr_backend.models import User, Post, Review

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Review)

