import { useLoginView } from '../hooks/useLoginView';

export function GoToRegister() {
    const { showRegister } = useLoginView();
    const handleClick = () => {
        showRegister();
    };
    return (
        <div className="caja-fondo-registro">
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>¡Regístrate para disfrutar de ClonTube!</p>
            <button id="btn-registrarse" onClick={handleClick}>Registrarse</button>
        </div>
    );
};