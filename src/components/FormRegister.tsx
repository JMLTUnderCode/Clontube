import { useState, useEffect } from 'react';
import { useLoginView } from '../hooks/useLoginView';
import { Input } from './Input';

export function FormRegister() {
    const { LOGIN_VIEW_STATE, setRegisterFields } = useLoginView();

    const [full_name, setFullName] = useState(LOGIN_VIEW_STATE.registerFields.full_name);
    const [username, setUsername] = useState(LOGIN_VIEW_STATE.registerFields.username);
    const [email, setEmail] = useState(LOGIN_VIEW_STATE.registerFields.email);
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        setRegisterFields({ full_name, username, email });
    }, [setRegisterFields, full_name, username, email]);

    function handleEmailBlur() {
        if (email && confirmEmail && email !== confirmEmail) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }

    function handleConfirmEmailBlur() {
        if (email && confirmEmail && email !== confirmEmail) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }

    function handlePasswordBlur() {
        if (password && confirmPassword && password !== confirmPassword) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }

    function handleConfirmPasswordBlur() {
        if (password && confirmPassword && password !== confirmPassword) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }

    return (
        <form className="register-form">
            <h2>Registrarse</h2>
            <Input type="FULL_NAME" label="Nombre Completo" field={full_name} onChange={setFullName} />
            <Input type="USERNAME" label="Usuario" field={username} onChange={setUsername} />
            <Input
                type="EMAIL"
                label="Correo Electrónico"
                field={email}
                onChange={setEmail}
                onBlur={handleEmailBlur}
                error={emailError}
            />
            {emailError && (
                <div className="input-error-popup">Los correos electrónicos no coinciden.</div>
            )}
            <Input
                type="EMAIL"
                label="Confirmar Correo Electrónico"
                field={confirmEmail}
                onChange={setConfirmEmail}
                onBlur={handleConfirmEmailBlur}
                error={emailError}
            />
            
            <Input
                type="PASSWORD"
                label="Contraseña"
                field={password}
                onChange={setPassword}
                onBlur={handlePasswordBlur}
                error={passwordError}
            />
            {passwordError && (
                <div className="input-error-popup">Las contraseñas no coinciden.</div>
            )}
            <Input
                type="PASSWORD"
                label="Confirmar Contraseña"
                field={confirmPassword}
                onChange={setConfirmPassword}
                onBlur={handleConfirmPasswordBlur}
                error={passwordError}
            />
            <button className="btn" type="submit">Registro</button>
        </form>
    );
};