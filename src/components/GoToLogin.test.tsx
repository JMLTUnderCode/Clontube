import { render, screen, fireEvent } from '@testing-library/react';
import { GoToLogin } from './GoToLogin';
import { LoginViewProvider } from '../providers/LoginViewProvider';
import { useLoginView } from '../hooks/useLoginView';
import React from 'react';

describe('GoToLogin component', () => {
    function WrapperWithConsumer({ children }: { children: React.ReactNode }) {
        // Exponemos el contexto para verificar el cambio de estado
        function Consumer() {
            const { LOGIN_VIEW_STATE } = useLoginView();
            // Renderiza nada, solo para exponer el contexto
            return <div data-testid="view">{LOGIN_VIEW_STATE.view}</div>;
        }
        return (
            <LoginViewProvider>
                {children}
                <Consumer />
            </LoginViewProvider>
        );
    }

    test('renders GoToLogin content', () => {
        render(
            <LoginViewProvider>
                <GoToLogin />
            </LoginViewProvider>
        );
        expect(screen.getByText(/¿Ya tienes una cuenta\?/i)).toBeInTheDocument();
        expect(screen.getByText(/¡Inicia sesión y disfruta de ClonTube!/i)).toBeInTheDocument();
        // Si tu botón tiene texto diferente, ajusta el regex:
        // expect(screen.getByRole('button', { name: /Iniciar ClonTube/i })).toBeInTheDocument();
    });

    test('calls showLogin and updates context when button is clicked', () => {
        render(
            <WrapperWithConsumer>
                <GoToLogin />
            </WrapperWithConsumer>
        );
        const button = screen.getByRole('button');
        // Simula el click
        fireEvent.click(button);
        // Verifica que el estado global cambió a 'login'
        expect(screen.getByTestId('view').textContent).toBe('login');
    });
});