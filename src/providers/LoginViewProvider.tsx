import React, { useCallback } from 'react';
import { loginViewReducer, loginViewState } from '../reducers/loginViewReducer';
import { LoginViewContext } from '../contexts/LoginViewContext';
import type { RegisterType, LoginType } from '../utils/types';
import type { LoginViewStateType } from '../utils/types';

function updateLocalStorageLoginView(state: LoginViewStateType) {
    localStorage.setItem('loginViewState', JSON.stringify(state));
};

function useLoginViewReducer() {
    const [state, dispatch] = React.useReducer(loginViewReducer, loginViewState);

    const showLogin = useCallback(() => {
        dispatch({ type: 'SET_LOGIN_VIEW', payload: state.registerFields });
    }, [state.registerFields]);

    const setLoginFields = useCallback((loginFields: LoginType) => {
        dispatch({ type: 'SET_LOGIN_FIELDS', payload: loginFields });
    }, []);

    const showRegister = useCallback(() => {
        dispatch({ type: 'SET_REGISTER_VIEW', payload: state.loginFields });
    }, [state.loginFields]);

    const setRegisterFields = useCallback((registerFields: RegisterType) => {
        dispatch({ type: 'SET_REGISTER_FIELDS', payload: registerFields });
    }, []);

    const clearFields = useCallback(() => {
        dispatch({ type: 'RESET_FIELDS' });
    }, []);

    return { state, showLogin, setLoginFields, showRegister, setRegisterFields, clearFields };
}

export function LoginViewProvider({ children }: { children: React.ReactNode }) {
    const { state, showLogin, showRegister, setLoginFields, setRegisterFields, clearFields } = useLoginViewReducer();

    // Sincroniza localStorage cada vez que el estado cambia
    /*React.useEffect(() => {
        updateLocalStorageLoginView(state);
    }, [state]);
    */

    return (
        <LoginViewContext.Provider value={{ LOGIN_VIEW_STATE: state, showLogin, setLoginFields, showRegister, setRegisterFields, clearFields }}>
            {children}
        </LoginViewContext.Provider>
    );
}