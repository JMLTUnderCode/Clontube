import { render, screen, fireEvent } from '@testing-library/react';
import { LoginRegisterPanel } from './LoginRegisterPanel';
import { LoginViewProvider } from '../providers/LoginViewProvider';

describe('LoginRegisterPanel component', () => {
    function renderWithProvider() {
        return render(
            <LoginViewProvider>
                <LoginRegisterPanel />
            </LoginViewProvider>
        );
    }

    test('renders FormLogin and GoToRegister by default', () => {
        renderWithProvider();
        expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
        expect(screen.getByText(/¿Aún no tienes una cuenta\?/i)).toBeInTheDocument();
    });

    test('applies correct animation classes in login view', () => {
        renderWithProvider();
        const cards = document.querySelectorAll('.card');
        // En vista login, la card izquierda tiene anim-appear-right, la derecha no tiene animación
        expect(cards[0].className).toMatch(/anim-appear-right/);
        expect(cards[1].className).not.toMatch(/anim-appear-left/);
    });

    test('shows FormRegister and GoToLogin after clicking register button', () => {
        renderWithProvider();
        const registerButton = screen.getByRole('button', { name: /Registrarse/i });
        fireEvent.click(registerButton);

        expect(screen.getByText(/Registrarse/i)).toBeInTheDocument();
        expect(screen.getByText(/¿Ya tienes una cuenta\?/i)).toBeInTheDocument();
    });

    test('applies correct animation classes in register view', () => {
        renderWithProvider();
        const registerButton = screen.getByRole('button', { name: /Registrarse/i });
        fireEvent.click(registerButton);

        const cards = document.querySelectorAll('.card');
        // En vista register, la card derecha tiene anim-appear-left, la izquierda no tiene animación
        expect(cards[0].className).not.toMatch(/anim-appear-right/);
        expect(cards[1].className).toMatch(/anim-appear-left/);
    });
});