import { useLoginView } from "../hooks/useLoginView";
export function GoToLogin() {
    const { showLogin } = useLoginView();
    const handleClick = () => {
        showLogin();
    };

    return (
        <div className="ctn-goto">
            <h3>¿Ya tienes una cuenta?</h3>
            <p>¡Inicia sesión y disfruta de ClonTube!</p>
            <button className="btn" onClick={handleClick} >Iniciar ClonTube</button>
        </div>
    );
};