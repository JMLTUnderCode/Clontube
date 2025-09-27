import type { AuthActionType, AuthStateType } from '../utils/types';

export const AuthState: AuthStateType = (() => {
    const stored = localStorage.getItem('authState');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            // Ensure all fields exist
            return {
                user: parsed.user || null,
                tk_access: parsed.tk_access || null,
                tk_refresh: parsed.tk_refresh || null,
                isAuthenticated: !!parsed.tk_access,
                failedAttempts: parsed.failedAttempts || 0,
            };
        } catch {
            // fallback to default
        }
    }
    return {
        user: null,
        tk_access: null,
        tk_refresh: null,
        isAuthenticated: false,
        failedAttempts: 0,
    };
})();

export function authenticationReducer(
    state: AuthStateType = AuthState,
    action: AuthActionType
): AuthStateType {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                tk_access: action.payload.access,
                tk_refresh: action.payload.refresh,
                isAuthenticated: true,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                failedAttempts: state.failedAttempts + 1,
            };
        case 'LOGOUT':
            return {
                user: null,
                tk_access: null,
                tk_refresh: null,
                isAuthenticated: false,
                failedAttempts: 0,
            };
        default:
            return state;
    }
}