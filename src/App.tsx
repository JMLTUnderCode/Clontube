import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { StartPage } from './pages/StartPage';
import { MainPage } from './pages/MainPage';
import { Footer } from './components/Footer';

export function App() {
     return (
        <BrowserRouter basename="/Clontube/">
            <div className="App">
                <Routes>
                    <Route path="/" element={<StartPage />} />
                    <Route path="/main/" element={ 
                        <ProtectedRoute>
                            <MainPage />
                        </ProtectedRoute>
                    } />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
};