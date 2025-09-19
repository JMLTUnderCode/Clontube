from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    # Solo personaliza si la vista requiere autenticación
    if response is not None and response.status_code == 401:
        view = context.get('view')
        # Solo aplica el mensaje si la vista NO es TokenObtainPairView
        if view and view.__class__.__name__ not in ['TokenObtainPairView', 'TokenRefreshView', 'TokenVerifyView']:
            response.data = {
                "success": False,
                "message": "No se proporcionaron credenciales de autenticación.",
            }
    return response