export type ViewType = 'login' | 'register';

export type Register = {
    full_name: string;
    username: string;
    email: string;
};

export type Login = {
    identifier: string;
};

export type LoginViewState = {
    view: ViewType;
    loginFields: Login;
    registerFields: Register;
};

export type LoginViewContextType = {
    LOGIN_VIEW_STATE: LoginViewState;
    showLogin: () => void;
    setLoginFields: (loginFields: Login) => void;
    showRegister: () => void;
    setRegisterFields: (registerFields: Register) => void;
    clearFields: () => void;
};

export type Action = 
    | { type: 'SET_LOGIN_VIEW'; payload: Register }
    | { type: 'SET_LOGIN_FIELDS'; payload: Login }
    | { type: 'SET_REGISTER_VIEW'; payload: Login }
    | { type: 'SET_REGISTER_FIELDS'; payload: Register }
    | { type: 'RESET_FIELDS' };