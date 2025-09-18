from rest_framework import viewsets
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from django.http import Http404

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'

    # Crear un nuevo usuario
    # route: POST /api/users/
    # request: 
    # { 
    #   "full_name": "Nombre Completo",
    #   "username": "nuevo_usuario", 
    #   "email": "nuevo@ejemplo.com", 
    #   "password": "contraseña" 
    # }
    # response:
    # Status 200
    # {
    #   "success": True,
    #   "user": {...},
    #   "message": "Usuario creado exitosamente."
    # }
    # Status 400
    # {
    #   "success": False,
    #   "errors": {...},
    #   "message": "Error en los datos enviados. Verifica los campos e intenta nuevamente."
    # }
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                "success": False,
                "errors": serializer.errors,
                "message": "Error en los datos enviados. Verifica los campos e intenta nuevamente."
            }, status=400)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
            "success": True,
            "user": serializer.data,
            "message": "Usuario creado exitosamente."
        }, status=200, headers=headers)

    # Obtener detalle de un usuario
    # route: GET /api/users/{username}/
    # response:
    # Status 200 
    # {
    #   "success": True,
    #   "user": {...},
    #   "message": "Detalle de usuario obtenido exitosamente."
    # }
    # Status 400
    # {
    #   "success": False,
    #   "message": "El usuario '{username}' no existe."
    # }
    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            username = kwargs.get('username', '')
            return Response({
                "success": False,
                "message": f"El usuario '{username}' no existe."
            }, status=400)
        serializer = self.get_serializer(instance)
        return Response({
            "success": True,
            "user": serializer.data,
            "message": "Detalle de usuario obtenido exitosamente."
        }, status=200)

    # Eliminar un usuario
    # route: DELETE /api/users/{username}/
    # response:
    # Status 200
    # {
    #   "success": True,
    #   "message": "Usuario '{username}' eliminado exitosamente."
    # }
    # Status 400
    # {
    #   "success": False,
    #   "message": "El usuario '{username}' no existe."
    # }
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            username = kwargs.get('username', '')
            return Response({
                "success": False,
                "message": f"El usuario '{username}' no existe."
            }, status=400)
        username = instance.username
        instance.delete()
        return Response({
            "success": True,
            "message": f"Usuario '{username}' eliminado exitosamente."
        }, status=200)

    # Listar todos los usuarios
    # route: GET /api/users/
    # response:
    # Status 200
    # {
    #   "success": True,
    #   "users": [...],
    # }
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "success": True,
            "users": serializer.data
        }, status=200)
    
    # Actualizar un usuario
    # route: PUT /api/users/{username}/
    # request:
    # Status 200 
    # {
    #   "full_name": "Nuevo Nombre Completo",
    #   "email": "<nuevo_email>"
    # }
    # response:
    # Status 200
    # {
    #   "success": True,
    #   "user": {...},
    #   "message": "Usuario actualizado exitosamente."
    # }
    # Status 400
    # {
    #   "success": False,
    #   "errors": {...},
    #   "message": "Error en los datos enviados. Verifica los campos e intenta nuevamente."
    # }
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            username = kwargs.get('username', '')
            return Response({
                "success": False,
                "message": f"El usuario '{username}' no existe."
            }, status=400)

        data = request.data.copy()
        # Prohibir actualización de username
        if 'username' in data and data['username'] != instance.username:
            return Response({
                "success": False,
                "message": "No está permitido cambiar el nombre de usuario."
            }, status=400)

        # Validar email único
        new_email = data.get('email')
        if new_email and new_email != instance.email:
            if User.objects.filter(email=new_email).exclude(username=instance.username).exists():
                return Response({
                    "success": False,
                    "message": "El correo electrónico ya está registrado por otro usuario."
                }, status=400)

        serializer = self.get_serializer(instance, data=data, partial=True)
        if not serializer.is_valid():
            return Response({
                "success": False,
                "errors": serializer.errors,
                "message": "Error en los datos enviados. Verifica los campos e intenta nuevamente."
            }, status=400)
        self.perform_update(serializer)
        return Response({
            "success": True,
            "user": serializer.data,
            "message": "Usuario actualizado exitosamente."
        }, status=200)