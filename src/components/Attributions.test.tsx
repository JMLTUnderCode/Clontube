import { render, screen } from '@testing-library/react';
import { Attributions } from './Attributions';

describe('Attributions component', () => {
    test('renders the attributions container', () => {
        render(<Attributions />);
        const container = screen.getByRole('link', { name: /icons by lordicon\.com/i }).parentElement;
        expect(container).toHaveClass('attributions');
    });

    test('renders the correct attribution link', () => {
        render(<Attributions />);
        const link = screen.getByRole('link', { name: /icons by lordicon\.com/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://lordicon.com/');
    });
});