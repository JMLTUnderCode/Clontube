import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer component', () => {
    test('renders Footer container with class "footer"', () => {
        render(<Footer />);
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
        expect(footer).toHaveClass('footer');
    });

    test('renders Attributions component inside Footer', () => {
        render(<Footer />);
        // Cambia el texto según lo que realmente renderiza Attributions
        expect(screen.getByText(/icons by lordicon.com/i)).toBeInTheDocument();
    });
});