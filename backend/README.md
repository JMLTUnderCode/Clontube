# Backend (Configuración, instalación y despliegue)

---

## 1. **Crea un envirotment con Python**
```sh
python3 -m venv env
```
Activalo
```sh
source env/bin/activate 
```
Para desactivarlo
```sh
deactivate
```

---

## 2. **Instala Django y Django REST Framework**

En tu terminal, ejecuta:

```sh
pip install django djangorestframework
```

---

## 3. **Crea el proyecto Django**

```sh
django-admin startproject backend .
```
Esto creará la carpeta y archivos base en el directorio actual.

---

## 4. **Crea una app principal (por ejemplo, `api`)**

```sh
python3 manage.py startapp api
```

---

## 5. **Configura Django REST Framework**

En `backend/settings.py`, agrega `'rest_framework'` y `'api'` a `INSTALLED_APPS`:

````python
# ...existing code...
INSTALLED_APPS = [
    # ...existing apps...
    'rest_framework',
    'api',
]
# ...existing code...
````

---

## 6. **Crear .env**

```sh
RENDER=1
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
DB_HOST=...
DB_PORT=...
```
> [!NOTE]
> El campo `RENDER` esta en `1` para `true` y `0` para `false`. Estoy funcionará en la configuración condicional de la base de datos en el siguiente paso.
---

## 7. **Configura la base de datos**

Render recomienda usar PostgreSQL. En `settings.py`, configura la base de datos:

````python
# ...existing code...
if os.environ.get('RENDER', None):
    # Configuración para Render
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ.get('DB_NAME'),
            'USER': os.environ.get('DB_USER'),
            'PASSWORD': os.environ.get('DB_PASSWORD'),
            'HOST': os.environ.get('DB_HOST'),
            'PORT': os.environ.get('DB_PORT'),
        }
    }
else:
    # Configuración local
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
# ...existing code...
````

En Render, estos valores se obtienen de las variables de entorno. Puedes usar `os.environ` para leerlas.

---

## 8. **Archivo requirements.txt**

Ejecuta en tu terminal (dentro del entorno virtual):

```sh
pip install gunicorn psycopg2-binary
pip freeze > requirements.txt
```

Asegúrate de que incluya al menos:
```
Django
djangorestframework
gunicorn
psycopg2-binary
```

---

## 9. **Archivo Procfile**

En la raíz del proyecto (donde está manage.py), crea un archivo llamado `Procfile` con este contenido:

```
web: gunicorn backend.wsgi
```

---

## 10. **Campos de configuracion en render**

Build Command
```sh
pip install -r requirements.txt
```

Start Command:
```sh
gunicorn backend.wsgi
```

---

## 11. **Variables de entorno en Render**

En la configuración del servicio web en Render, agrega:

- `RENDER=1` (para activar la configuración de Render en settings.py)
- `DB_NAME` (nombre de la base de datos de Render)
- `DB_USER` (usuario de la base de datos)
- `DB_PASSWORD` (contraseña de la base de datos)
- `DB_HOST` (host de la base de datos)
- `DB_PORT` (port de la base de datos)

---

## 12. **Migraciones**

Si en el `.env` se tiene `RENDER=1` entonces los settings.py toman los valores de la instancia de la base de datos desde el mismo archivo `.env`. Por el contrario, si se tiene `RENDER=0` entonces la migracion se hara en local.

```sh
python3 manage.py makemigrations
python3 manage.py migrate
```

---

## 13. **Despliegue en local**

```sh
python3 manage.py runserver
```

## 14. **Configuración de JWT**

En tu entorno virtual, ejecuta:
```sh
pip install djangorestframework-simplejwt
```

Agrega la autenticación JWT en tu configuración de Django REST Framework en `settings.py`:

````python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}
````

## 15. **Testing**
En tu entorno virtual, ejecuta:
```sh
python3 manage.py test api
```