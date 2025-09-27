import type { ViewType, LoginViewStateType, LoginViewActionType } from '../utils/types';

export const loginViewState: LoginViewStateType = (() => {
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

export function loginViewReducer(
    state: LoginViewStateType = loginViewState,
    action: LoginViewActionType
): LoginViewStateType {
    if (!action || !action.type) return state;

    let newState = state;
    if (action.type === 'SET_LOGIN_VIEW') {
        const { payload } = action;
        newState = {
            ...state, 
            view: 'login' as ViewType, 
            registerFields: { ...state.registerFields, ...payload }
        };
    }

    if (action.type === 'SET_LOGIN_FIELDS') {
        const { payload } = action;
        newState = { 
            ...state, 
            loginFields: { ...state.loginFields, ...payload } 
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

    if (action.type === 'SET_REGISTER_FIELDS') {
        const { payload } = action;
        newState = { 
            ...state, 
            registerFields: { ...state.registerFields, ...payload } 
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
    
    return newState;
};