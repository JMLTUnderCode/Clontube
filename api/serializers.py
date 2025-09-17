from rest_framework import serializers
from .models import User
import re

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, max_length=16)

    def validate_password(self, value):
        if len(value) < 8 or len(value) > 16:
            raise serializers.ValidationError("La contraseña debe tener entre 8 y 16 caracteres.")
        return value

    class Meta:
        model = User
        fields = ['id', 'full_name', 'username', 'email', 'password']