// Ejemplo simplificado
import { useLoginView } from '../hooks/useLoginView';
import { GoToRegister } from './GoToRegister';
import { GoToLogin } from './GoToLogin';
import { FormLogin } from './FormLogin';
import { FormRegister } from './FormRegister';
import '../styles/LoginRegisterPanel.css';

export function LoginRegisterPanel() {
    const { LOGIN_VIEW_STATE } = useLoginView();
    const classLogin = `card ${LOGIN_VIEW_STATE.view === 'login' ? 'anim-appear-right' : ''}`;
    const classRegister = `card ${LOGIN_VIEW_STATE.view === 'login' ? '' : 'anim-appear-left'}`;
    return (
        <div className="ctn-login-register-panel">
            <div className={classLogin}>
                {LOGIN_VIEW_STATE.view === 'login' ? <FormLogin /> : <GoToLogin />}
            </div>
            <div className={classRegister}>
                {LOGIN_VIEW_STATE.view === 'login' ? <GoToRegister /> : <FormRegister />}
            </div>
        </div>
    );
}