import { LoginViewProvider } from '../providers/LoginViewProvider';
import { LoginRegisterPanel } from '../components/LoginRegisterPanel';
import '../styles/startPage.css';

export function StartPage() {
    return (
        <LoginViewProvider>
            <main>
                <div className="fondo-logotipo">
                    <div className="logotipo">
                        <img src="./logo.png" alt="Logotipo de ClonTube, meme de peter parker con logo de youtube" />
                    </div>
                    <h2>ClonTube</h2>
                </div>
                <LoginRegisterPanel />
            </main>
        </LoginViewProvider>
    );
};