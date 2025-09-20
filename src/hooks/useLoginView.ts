import { useContext } from 'react';
import { LoginViewContext } from '../contexts/loginViewContext';

export function useLoginView() {
    const context = useContext(LoginViewContext);
    if (!context) {
        throw new Error('useLoginView must be used within a LoginViewProvider');
    }
    return context;
}