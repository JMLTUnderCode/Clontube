import { render, screen } from '@testing-library/react';
import { StartPage } from './StartPage';
import { AuthenticationProvider } from '../providers/AuthenticationProvider';
import { MemoryRouter } from 'react-router-dom';

describe('StartPage component', () => {
    function renderWithProviders() {
        return render(
            <AuthenticationProvider>
                <MemoryRouter>
                    <StartPage />
                </MemoryRouter>
            </AuthenticationProvider>
        );
    }

    test('renders logo image with correct alt text', () => {
        renderWithProviders();
        const logo = screen.getByAltText(/Logotipo de ClonTube, meme de peter parker con logo de youtube/i);
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', './logo.png');
    });

    test('renders ClonTube heading', () => {
        renderWithProviders();
        expect(screen.getByRole('heading', { name: /ClonTube/i, level: 2 })).toBeInTheDocument();
    });

    test('renders LoginRegisterPanel', () => {
        renderWithProviders();
        expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
    });
});