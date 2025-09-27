export type ViewType = 'login' | 'register';

export type RegisterType = {
    full_name: string;
    username: string;
    email: string;
};

export type LoginType = {
    identifier: string;
};

export type LoginViewStateType = {
    view: ViewType;
    loginFields: LoginType;
    registerFields: RegisterType;
};

export type LoginViewContextType = {
    LOGIN_VIEW_STATE: LoginViewStateType;
    showLogin: () => void;
    setLoginFields: (loginFields: LoginType) => void;
    showRegister: () => void;
    setRegisterFields: (registerFields: RegisterType) => void;
    clearFields: () => void;
};

export type LoginViewActionType = 
    | { type: 'SET_LOGIN_VIEW'; payload: RegisterType }
    | { type: 'SET_LOGIN_FIELDS'; payload: LoginType }
    | { type: 'SET_REGISTER_VIEW'; payload: LoginType }
    | { type: 'SET_REGISTER_FIELDS'; payload: RegisterType }
    | { type: 'RESET_FIELDS' };


export type UserType = {
    id: number;
    username: string;
    email: string;
    full_name: string;
    role: string;
};

export type AuthStateType = {
    user: UserType | null;
    tk_access: string | null;
    tk_refresh: string | null;
    isAuthenticated: boolean;
    failedAttempts: number;
};

export type AuthContextType = {
    AUTH_STATE: AuthStateType;
    login: (id: string, pass: string) => Promise<boolean>;
    logout: () => void;
};

export type AuthActionType = 
    | { type: 'LOGIN_SUCCESS'; payload: { user: UserType; access: string; refresh: string } }
    | { type: 'LOGIN_FAILURE' }
    | { type: 'LOGOUT' };