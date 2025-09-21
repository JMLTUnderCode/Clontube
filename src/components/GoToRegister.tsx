import { useLoginView } from '../hooks/useLoginView';

export function GoToRegister() {
    const { showRegister } = useLoginView();
    const handleClick = () => {
        showRegister();
    };
    return (
        <div className="ctn-goto">
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>¡Regístrate para disfrutar de ClonTube!</p>
            <button className="btn" onClick={handleClick}>Registrarse</button>
        </div>
    );
};