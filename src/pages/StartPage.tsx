import { LoginViewProvider } from '../providers/LoginViewProvider';
import { useLoginView } from '../hooks/useLoginView';
import { FormLogin } from '../components/FormLogin';
import { FormRegister } from '../components/FormRegister';
import { GoToLogin } from '../components/GoToLogin';
import { GoToRegister } from '../components/GoToRegister';
import '../styles/login.css';

function MainContent() {
    const { LOGIN_VIEW_STATE } = useLoginView();

    return (
        <main>
            <div className="fondo-logotipo">
                <div className="logotipo">
                    <img src="./logo.png" alt="" />
                </div>
                <h2>ClonTube</h2>
            </div>
            <div className="contenedor-general">
                <div className="caja-fondo">
                    {LOGIN_VIEW_STATE.view === 'login' ? <GoToRegister /> : <GoToLogin />}
                </div>
                <div className="contenedor-login-registro">
                    {LOGIN_VIEW_STATE.view === 'login' ? <FormLogin /> : <FormRegister />}
                </div>
            </div>
        </main>
    );
}

export function StartPage() {
    return (
        <LoginViewProvider>
            <MainContent />
        </LoginViewProvider>
    );
};