import { render, screen, fireEvent } from '@testing-library/react';
import { FormRegister } from './FormRegister';
import { LoginViewProvider } from '../providers/LoginViewProvider';

describe('FormRegister component', () => {
    function renderWithProvider() {
        return render(
            <LoginViewProvider>
                <FormRegister />
            </LoginViewProvider>
        );
    }

    test('renders all register form fields', () => {
        renderWithProvider();
        expect(screen.getByText(/Registrarse/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Correo Electrónico$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirmar Correo Electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Contraseña$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirmar Contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Registro/i })).toBeInTheDocument();
    });

    test('allows user to type in all fields', () => {
        renderWithProvider();
        const fullNameInput = screen.getByLabelText(/Nombre Completo/i);
        const usernameInput = screen.getByLabelText(/Usuario/i);
        const emailInput = screen.getByLabelText(/^Correo Electrónico$/i);
        const confirmEmailInput = screen.getByLabelText(/Confirmar Correo Electrónico/i);
        const passwordInput = screen.getByLabelText(/^Contraseña$/i);
        const confirmPasswordInput = screen.getByLabelText(/Confirmar Contraseña/i);
        
        fireEvent.change(fullNameInput, { target: { value: 'Test User' } });
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
        fireEvent.change(confirmEmailInput, { target: { value: 'test@mail.com' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });

        expect(fullNameInput).toHaveValue('Test User');
        expect(usernameInput).toHaveValue('testuser');
        expect(emailInput).toHaveValue('test@mail.com');
        expect(confirmEmailInput).toHaveValue('test@mail.com');
        expect(passwordInput).toHaveValue('123456');
        expect(confirmPasswordInput).toHaveValue('123456');
    });

    test('shows error if emails do not match on blur', () => {
        renderWithProvider();
        const emailInput = screen.getByLabelText(/^Correo Electrónico$/i);
        const confirmEmailInput = screen.getByLabelText(/Confirmar Correo Electrónico/i);

        fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
        fireEvent.change(confirmEmailInput, { target: { value: 'other@mail.com' } });
        fireEvent.blur(confirmEmailInput);

        expect(screen.getByText(/Los correos electrónicos no coinciden/i)).toBeInTheDocument();
    });

    test('shows error if passwords do not match on blur', () => {
        renderWithProvider();
        const passwordInput = screen.getByLabelText(/^Contraseña$/i);
        const confirmPasswordInput = screen.getByLabelText(/Confirmar Contraseña/i);

        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.change(confirmPasswordInput, { target: { value: '654321' } });
        fireEvent.blur(confirmPasswordInput);

        expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
    });

    test('does not show error if emails and passwords match', () => {
        renderWithProvider();
        const emailInput = screen.getByLabelText(/^Correo Electrónico$/i);
        const confirmEmailInput = screen.getByLabelText(/Confirmar Correo Electrónico/i);
        const passwordInput = screen.getByLabelText(/^Contraseña$/i);
        const confirmPasswordInput = screen.getByLabelText(/Confirmar Contraseña/i);

        fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
        fireEvent.change(confirmEmailInput, { target: { value: 'test@mail.com' } });
        fireEvent.blur(confirmEmailInput);

        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });
        fireEvent.blur(confirmPasswordInput);

        expect(screen.queryByText(/no coinciden/i)).not.toBeInTheDocument();
    });
});