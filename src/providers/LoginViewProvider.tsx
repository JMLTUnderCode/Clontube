import React from 'react';
import { loginViewReducer, loginViewState } from '../reducers/loginView';
import { LoginViewContext } from '../contexts/loginViewContext';

function useLoginViewReducer() {
    const [state, dispatch] = React.useReducer(loginViewReducer, loginViewState);

    const showLogin = (registerFields?: Partial<typeof state.registerFields>) => {
        dispatch({ type: 'SET_LOGIN_VIEW', payload: registerFields || {} });
    }

    const showRegister = (loginFields?: Partial<typeof state.loginFields>) => {
        dispatch({ type: 'SET_REGISTER_VIEW', payload: loginFields || {} });
    }

    const clearFields = () => {
        dispatch({ type: 'RESET_FIELDS' });
    }

    return { state, showLogin, showRegister, clearFields };
}

export function LoginViewProvider({ children }: { children: React.ReactNode }) {
    const { state, showLogin, showRegister, clearFields } = useLoginViewReducer();

    return (
        <LoginViewContext.Provider value={{ LOGIN_VIEW_STATE: state, showLogin, showRegister, clearFields }}>
            {children}
        </LoginViewContext.Provider>
    );
}