import React, { useCallback, useEffect, useReducer } from 'react';
import { authenticationReducer, AuthState } from '../reducers/authenticationReducer';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import type { AuthStateType } from '../utils/types';

function updateLocalStorageAuth(state: AuthStateType) {
    localStorage.setItem('authState', JSON.stringify(state));
};

function useAuthReducer() {
    const [state, dispatch] = useReducer(authenticationReducer, AuthState);

    const login = useCallback(async (identifier: string, password: string) => {
        try {
            const res = await fetch('https://backend-9tcm.onrender.com/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, password }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data.user, access: data.access, refresh: data.refresh } });
                return true;
            } else {
                dispatch({ type: 'LOGIN_FAILURE' });
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            dispatch({ type: 'LOGIN_FAILURE' });
            return false;
        }
    }, []);

    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
    }, []);

    return { state, login, logout };
}

export function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    const { state, login, logout } = useAuthReducer();

    // Sincroniza localStorage cada vez que el estado cambia
    useEffect(() => {
        updateLocalStorageAuth(state);
    }, [state]);

    return (
        <AuthenticationContext.Provider value={{ AUTH_STATE: state, login, logout }}>
            {children}
        </AuthenticationContext.Provider>
    );
}