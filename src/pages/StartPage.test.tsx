import { render, screen } from '@testing-library/react';
import { StartPage } from './StartPage';

describe('StartPage component', () => {
    test('renders logo image with correct alt text', () => {
        render(<StartPage />);
        const logo = screen.getByAltText(/Logotipo de ClonTube, meme de peter parker con logo de youtube/i);
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', './logo.png');
    });

    test('renders ClonTube heading', () => {
        render(<StartPage />);
        expect(screen.getByRole('heading', { name: /ClonTube/i, level: 2 })).toBeInTheDocument();
    });

    test('renders LoginRegisterPanel', () => {
        render(<StartPage />);
        // Busca un texto característico del panel de login/register
        expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
    });
});