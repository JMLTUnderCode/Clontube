import { useState, useEffect } from 'react';
import { useLoginView } from '../hooks/useLoginView';
import { Input } from './Input';

export function FormRegister() {
    const { LOGIN_VIEW_STATE } = useLoginView();

    const [full_name, setFullName] = useState(LOGIN_VIEW_STATE.registerFields.full_name);
    const [username, setUsername] = useState(LOGIN_VIEW_STATE.registerFields.username);
    const [email, setEmail] = useState(LOGIN_VIEW_STATE.registerFields.email);
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        LOGIN_VIEW_STATE.registerFields.full_name = full_name;
        LOGIN_VIEW_STATE.registerFields.username = username;
        LOGIN_VIEW_STATE.registerFields.email = email;
    }, [LOGIN_VIEW_STATE.registerFields, full_name, username, email]);

    return (
        <form className="register-form">
            <h2>Registrarse</h2>
            <Input type="FULL_NAME" label="Nombre Completo" field={full_name} onChange={setFullName} />
            <Input type="USERNAME" label="Usuario" field={username} onChange={setUsername} />
            <Input type="EMAIL" label="Correo Electrónico" field={email} onChange={setEmail} />
            <Input type="EMAIL" label="Confirmar Correo Electrónico" field={confirmEmail} onChange={setConfirmEmail} />
            <Input type="PASSWORD" label="Contraseña" field={password} onChange={setPassword} />
            <Input type="PASSWORD" label="Confirmar Contraseña" field={confirmPassword} onChange={setConfirmPassword} />
            <button className="btn" type="submit">Registro</button>
        </form>
    );
};