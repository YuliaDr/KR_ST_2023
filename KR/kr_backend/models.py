from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, email, last_name, first_name, middle_name='', password=None):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            last_name=last_name,
            first_name=first_name,
            middle_name=middle_name
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(
            email=email,
            password=password,
            **extra_fields
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, null=True)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=200)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ["last_name", "first_name"]

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return self.email


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    authors = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    annotation = models.TextField()
    date = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        verbose_name = 'post'
        verbose_name_plural = 'posts'

    def __str__(self):
        return self.title


class Review(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        verbose_name = 'review'
        verbose_name_plural = 'reviews'

    def __str__(self):
        return str(self.id)


# class PostInfoView(models.Model):
#     id_post = models.IntegerField()
#     id_reviewer = models.IntegerField()
#     id_poster = models.IntegerField()
#     title = models.CharField(max_length=255)
#     username_reviewer = models.CharField(max_length=100)
#
#     def save(self, *args, **kwargs):
#         raise NotSupportedError('This model is tied to a view, it cannot be saved.')
#
#     class Meta:
#         managed = False
#         db_table = 'post_info_view'
#         verbose_name = 'post_info'
#         verbose_name_plural = 'post_info'
