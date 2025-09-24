import './styles/App.css'
import { StartPage } from './pages/StartPage';
import { Footer } from './components/Footer';

export function App() {
    return (
        <div className="App">
            <StartPage />
            <Footer />
        </div>
    );
};