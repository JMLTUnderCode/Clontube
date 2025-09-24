import { render, screen, fireEvent } from '@testing-library/react';
import { GoToRegister } from './GoToRegister';
import { LoginViewProvider } from '../providers/LoginViewProvider';
import { useLoginView } from '../hooks/useLoginView';
import React from 'react';

describe('GoToRegister component', () => {
    function WrapperWithConsumer({ children }: { children: React.ReactNode }) {
        function Consumer() {
            const { LOGIN_VIEW_STATE } = useLoginView();
            return <div data-testid="view">{LOGIN_VIEW_STATE.view}</div>;
        }
        return (
            <LoginViewProvider>
                {children}
                <Consumer />
            </LoginViewProvider>
        );
    }

    test('renders GoToRegister content', () => {
        render(
            <LoginViewProvider>
                <GoToRegister />
            </LoginViewProvider>
        );
        expect(screen.getByText(/¿Aún no tienes una cuenta\?/i)).toBeInTheDocument();
        expect(screen.getByText(/¡Regístrate para disfrutar de ClonTube!/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
    });

    test('calls showRegister and updates context when button is clicked', () => {
        render(
            <WrapperWithConsumer>
                <GoToRegister />
            </WrapperWithConsumer>
        );
        const button = screen.getByRole('button', { name: /Registrarse/i });
        fireEvent.click(button);
        expect(screen.getByTestId('view').textContent).toBe('register');
    });
});