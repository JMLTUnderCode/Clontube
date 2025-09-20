import type { ViewType, LoginViewState, Action } from '../utils/types';

export const loginViewState: LoginViewState = (() => {
    const stored = localStorage.getItem('loginViewState');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            // Ensure all fields exist
            return {
                view: parsed.view || 'login',
                loginFields: {
                    identifier: parsed.loginFields?.identifier || '',
                },
                registerFields: {
                    full_name: parsed.registerFields?.full_name || '',
                    username: parsed.registerFields?.username || '',
                    email: parsed.registerFields?.email || '',
                },
            };
        } catch {
            // fallback to default
        }
    }
    return {
        view: 'login',
        loginFields: { identifier: '' },
        registerFields: { full_name: '', username: '', email: '' },
    };
})();

export function updateLocalStorageLoginView(state: LoginViewState) {
    localStorage.setItem('loginViewState', JSON.stringify(state));
};

export const STATE_ACTION_TYPES = {
    SET_LOGIN_VIEW: 'SET_LOGIN_VIEW',
    SET_REGISTER_VIEW: 'SET_REGISTER_VIEW',
    RESET_FIELDS: 'RESET_FIELDS',
};

export function loginViewReducer(
    state: LoginViewState = loginViewState,
    action: Action
): LoginViewState {
    if (!action || !action.type) return state;

    if (action.type === 'SET_LOGIN_VIEW' && state.view === 'login') {
        return state;
    }

    if (action.type === 'SET_REGISTER_VIEW' && state.view === 'register') {
        return state;
    }

    let newState = state;
    if (action.type === 'SET_LOGIN_VIEW') {
        const { payload } = action;
        newState = {
            ...state, 
            view: 'login' as ViewType, 
            registerFields: { ...state.registerFields, ...payload }
        };
    }

    if (action.type === 'SET_REGISTER_VIEW') {
        const { payload } = action;
        newState = { 
            ...state, 
            view: 'register' as ViewType,
            loginFields: { ...state.loginFields, ...payload }
        };
    }

    if (action.type === 'RESET_FIELDS') {
        newState = {
            ...state,
            view: 'login' as ViewType,
            loginFields: { identifier: '' },
            registerFields: { full_name: '', username: '', email: '' },
        };
    }
    
    updateLocalStorageLoginView(newState);
    return newState;
};