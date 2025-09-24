import { useState, useEffect } from 'react';
import { useLoginView } from '../hooks/useLoginView';
import { Input } from './Input';

export function FormLogin() {
    const { LOGIN_VIEW_STATE, setLoginFields } = useLoginView();

    const [identifier, setIdentifier] = useState(LOGIN_VIEW_STATE.loginFields.identifier || '');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setLoginFields({ identifier });
    }, [ setLoginFields, identifier ]);

    return (
        <form className="login-form">
            <h2>Iniciar Sesión</h2>
            <Input type="USERNAME" label="Usuario / Correo Electrónico" field={identifier} onChange={setIdentifier} />
            <Input type="PASSWORD" label="Contraseña" field={password} onChange={setPassword} />

            <button className="btn" type="submit">Entrar</button>
        </form>
    );
}