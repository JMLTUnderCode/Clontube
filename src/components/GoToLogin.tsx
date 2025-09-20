import { useLoginView } from "../hooks/useLoginView";
export function GoToLogin() {
    const { showLogin } = useLoginView();
    const handleClick = () => {
        showLogin();
    };

    return (
        <div className="caja-fondo-login">
            <h3>¿Ya tienes una cuenta?</h3>
            <p>¡Inicia sesión y disfruta de ClonTube!</p>
            <button id="btn-iniciar-seccion" onClick={handleClick} >Iniciar ÑuTube</button>
        </div>
    );
};