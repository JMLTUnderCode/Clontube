# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
import re
from django.core.validators import RegexValidator, MinLengthValidator, MaxLengthValidator, EmailValidator

class UserManager(BaseUserManager):
    def create_user(self, username, email, full_name, password=None):
        if not email:
            raise ValueError('El usuario debe tener un correo electrónico')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, full_name=full_name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, full_name, password):
        user = self.create_user(username, email, full_name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('admin', 'Administrador'),
        ('user', 'Usuario'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    full_name = models.CharField(
        max_length=50,
        validators=[
            RegexValidator(
                regex=r'^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$',
                message='El nombre solo puede contener letras y espacios.'
            )
        ]
    )
    username = models.CharField(
        max_length=12,
        unique=True,
        validators=[
            MinLengthValidator(6),
            MaxLengthValidator(12)
        ]
    )
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator(message='Ingrese un correo electrónico válido.')]
    )
    password = models.CharField(
        max_length=128,  # Django maneja el hash, pero puedes validar en el serializer
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'full_name']

    objects = UserManager()

    def __str__(self):
        return self.username