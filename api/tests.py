from rest_framework.test import APITestCase
from django.urls import reverse
from .models import User

# Create your tests here.

class UserAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            full_name="Test User",
            username="testuser",
            email="test@email.com",
            password="TestPass123"
        )
        # Login y obtención de token JWT
        url = reverse('token_obtain_pair')
        response = self.client.post(url, {
            "username": "testuser",
            "password": "TestPass123"
        }, format='json')
        self.token = response.data['access']
        self.auth_header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}

    def test_create_user(self):
        url = reverse('user-list')
        data = {
            "full_name": "Nuevo Usuario",
            "username": "nuevo123",
            "email": "nuevo@email.com",
            "password": "ClaveSegura1"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['success'])

    def test_list_users(self):
        url = reverse('user-list')
        response = self.client.get(url, **self.auth_header)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['success'])
        self.assertIn('users', response.data)
        self.assertGreaterEqual(len(response.data['users']), 1)

    def test_update_email(self):
        url = reverse('user-detail', args=[self.user.username])
        data = {"email": "nuevoemail@email.com"}
        response = self.client.put(url, data, format='json', **self.auth_header)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['user']['email'], "nuevoemail@email.com")

    def test_update_full_name(self):
        url = reverse('user-detail', args=[self.user.username])
        data = {"full_name": "Usuario Actualizado"}
        response = self.client.put(url, data, format='json', **self.auth_header)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['user']['full_name'], "Usuario Actualizado")

    def test_delete_user(self):
        url = reverse('user-detail', args=[self.user.username])
        response = self.client.delete(url, **self.auth_header)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['success'])
        
    def test_delete_user_not_found(self):
        url = reverse('user-detail', args=['nonexistent'])
        response = self.client.delete(url, **self.auth_header)
        self.assertEqual(response.status_code, 400)
        self.assertFalse(response.data['success'])
        self.assertIn("no existe", response.data['message'].lower())

    def test_update_other_user_forbidden(self):
        # Creamos otro usuario
        other_user = User.objects.create_user(
            full_name="Otro Usuario",
            username="otheruser",
            email="other@email.com",
            password="OtherPass123"
        )
        url = reverse('user-detail', args=[other_user.username])
        data = {"full_name": "Intento de Cambio"}
        response = self.client.put(url, data, format='json', **self.auth_header)
        self.assertEqual(response.status_code, 403)
        self.assertFalse(response.data['success'])
        self.assertIn("no tienes permisos", response.data['message'].lower())

    def test_delete_other_user_forbidden(self):
        # Creamos otro usuario
        other_user = User.objects.create_user(
            full_name="Otro Usuario",
            username="otheruser2",
            email="other2@email.com",
            password="OtherPass123"
        )
        url = reverse('user-detail', args=[other_user.username])
        response = self.client.delete(url, **self.auth_header)
        self.assertEqual(response.status_code, 403)
        self.assertFalse(response.data['success'])
        self.assertIn("no tienes permisos", response.data['message'].lower())

class LoginAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            full_name="Login User",
            username="loginuser",
            email="loginuser@email.com",
            password="LoginPass123"
        )
        self.user.save()
        self.url = reverse('custom_login')
    
    def test_login_with_username(self):
        data = {
            "identifier": "loginuser",
            "password": "LoginPass123"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['success'])
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['user']['username'], data['identifier'])
     
    def test_login_with_email(self):
        data = {
            "identifier": "loginuser@email.com",
            "password": "LoginPass123"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['success'])
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['user']['email'], data['identifier'])
    
    def test_login_invalid_password(self):
        data = {
            "identifier": "loginuser",
            "password": "WrongPass"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 401)
        self.assertFalse(response.data['success'])
        self.assertIn("credenciales inválidas", response.data['message'].lower())
    
    def test_login_user_not_found(self):
        data = {
            "identifier": "nonexistent",
            "password": "SomePass"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 401)
        self.assertFalse(response.data['success'])
        self.assertIn("credenciales inválidas", response.data['message'].lower())
    
    def test_login_missing_fields(self):
        data = {
            "identifier": "",
            "password": ""
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertFalse(response.data['success'])
        self.assertIn("debes proporcionar", response.data['message'].lower())
        self.assertIn("contraseña", response.data['message'].lower())
        self.assertIn("usuario/correo", response.data['message'].lower())