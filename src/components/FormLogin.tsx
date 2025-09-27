import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginView } from '../hooks/useLoginView';
import { useAuth } from '../hooks/useAuth';
import { Input } from './Input';

export function FormLogin() {
    const navigate = useNavigate();
    const { LOGIN_VIEW_STATE, setLoginFields } = useLoginView();
    const { login } = useAuth();

    const [identifier, setIdentifier] = useState(LOGIN_VIEW_STATE.loginFields.identifier || '');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(identifier, password);
        if (success) {
            navigate('/main/');
        }
    };

    useEffect(() => {
        setLoginFields({ identifier });
    }, [setLoginFields, identifier]);

    return (
        <form className="login-form" onSubmit={handleLogin}>
            <h2>Iniciar Sesión</h2>
            <Input type="USERNAME" label="Usuario / Correo Electrónico" field={identifier} onChange={setIdentifier} />
            <Input type="PASSWORD" label="Contraseña" field={password} onChange={setPassword} />

            <button className="btn" type="submit">Entrar</button>
        </form>
    );
}