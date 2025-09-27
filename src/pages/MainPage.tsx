import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';

export function MainPage() {
    const navigate = useNavigate();
    const { AUTH_STATE, logout } = useAuthentication();

    const handleLogout = () => {
        logout();
        navigate('/');
    }
    return (
        <div>
            <h2>Main Page</h2>
            <p>Welcome, {AUTH_STATE.user ? AUTH_STATE.user.username : 'Guest'}!</p>
            <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
    )
}