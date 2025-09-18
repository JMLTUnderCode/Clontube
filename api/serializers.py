from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        max_length=16,
        error_messages={
            'min_length': 'La contraseña debe tener al menos 8 caracteres.',
            'max_length': 'La contraseña debe tener máximo 16 caracteres.'
        }
    )

    full_name = serializers.CharField(
        error_messages={
            'blank': 'El nombre completo es obligatorio.',
            'invalid': 'El nombre completo solo puede contener letras y espacios.'
        }
    )

    username = serializers.CharField(
        min_length=6,
        max_length=12,
        error_messages={
            'min_length': 'El usuario debe tener al menos 6 caracteres.',
            'max_length': 'El usuario debe tener máximo 12 caracteres.',
            'unique': 'El nombre de usuario ya está registrado.'
        }
    )

    email = serializers.EmailField(
        error_messages={
            'invalid': 'El correo electrónico no es válido.',
            'unique': 'El correo electrónico ya está registrado.'
        }
    )

    def validate_full_name(self, value):
        import re
        if not re.match(r'^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$', value):
            raise serializers.ValidationError('El nombre completo solo puede contener letras y espacios.')
        return value
    
    def validate(self, data):
        username = data.get('username')
        email = data.get('email')

        # Validar unicidad de username solo si se está creando (no en update)
        if self.instance is None and username:
            if User.objects.filter(username=username).exists():
                raise serializers.ValidationError({'username': 'El nombre de usuario ya está registrado.'})

        # Validar unicidad de email
        if email:
            qs = User.objects.filter(email=email)
            if self.instance:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise serializers.ValidationError({'email': 'El correo electrónico ya está registrado.'})

        return data
    
    class Meta:
        model = User
        fields = ['id', 'full_name', 'username', 'email', 'password']