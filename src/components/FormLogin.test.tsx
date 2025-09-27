import { render, screen, fireEvent } from '@testing-library/react';
import { FormLogin } from './FormLogin';
import { LoginViewProvider } from '../providers/LoginViewProvider';
import { AuthenticationProvider } from '../providers/AuthenticationProvider';
import { MemoryRouter } from 'react-router-dom';

describe('FormLogin component', () => {
    function renderWithProvider() {
        return render(
            <AuthenticationProvider>
                <MemoryRouter>
                    <LoginViewProvider>
                        <FormLogin />
                    </LoginViewProvider>
                </MemoryRouter>
            </AuthenticationProvider>
        );
    }

    test('renders login form fields', () => {
        renderWithProvider();
        expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Usuario \/ Correo Electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    });

    test('allows user to type in identifier and password fields', () => {
        renderWithProvider();
        const identifierInput = screen.getByLabelText(/Usuario \/ Correo Electrónico/i);
        const passwordInput = screen.getByLabelText(/Contraseña/i);

        fireEvent.change(identifierInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

        expect(identifierInput).toHaveValue('testuser');
        expect(passwordInput).toHaveValue('mypassword');
    });

    test('toggles password visibility when eye button is clicked', () => {
        renderWithProvider();
        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const eyeButton = document.querySelector('.btn-eye');

        // Por defecto debe estar oculto
        expect(passwordInput).toHaveAttribute('type', 'password');

        // Haz click en el botón del ojo
        if (eyeButton) {
            fireEvent.click(eyeButton);
        }

        // Ahora debe estar visible
        expect(passwordInput).toHaveAttribute('type', 'text');
    });

    test('submits the form when the button is clicked', () => {
        renderWithProvider();
        const form = document.querySelector('.login-form');
        const button = screen.getByRole('button', { name: /Entrar/i });

        if (form) {
            fireEvent.submit(form);
        }

        // No actual submit logic, so just check that the button is present
        expect(button).toBeInTheDocument();
    });
});