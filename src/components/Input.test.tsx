import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Input } from './Input';

test('renders input and label', () => {
    render(<Input type="USERNAME" label="Usuario" field="" onChange={() => {}} />);
    expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
});

test('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<Input type="USERNAME" label="Usuario" field="" onChange={handleChange} />);
    const input = screen.getByLabelText(/Usuario/i);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledWith('test');
});

test('shows error class when error prop is true', () => {
    render(<Input type="USERNAME" label="Usuario" field="" onChange={() => {}} error />);
    const input = screen.getByLabelText(/Usuario/i);
    expect(input).toHaveClass('input-error');
});

test('toggles password visibility', () => {
    render(<Input type="PASSWORD" label="Contraseña" field="" onChange={() => {}} />);
    const input = screen.getByLabelText(/Contraseña/i);
    const button = screen.getByRole('button');
    // Por defecto debe ser password
    expect(input).toHaveAttribute('type', 'password');
    // Click para mostrar
    fireEvent.click(button);
    expect(input).toHaveAttribute('type', 'text');
    // Click para ocultar
    fireEvent.click(button);
    expect(input).toHaveAttribute('type', 'password');
});

test('calls onBlur when input loses focus', () => {
    const handleBlur = vi.fn();
    render(<Input type="USERNAME" label="Usuario" field="" onChange={() => {}} onBlur={handleBlur} />);
    const input = screen.getByLabelText(/Usuario/i);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
});