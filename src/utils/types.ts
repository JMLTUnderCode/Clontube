export type ViewType = 'login' | 'register';

export type LoginViewState = {
    view: ViewType;
    loginFields: {
        identifier: string;
    };
    registerFields: {
        full_name: string;
        username: string;
        email: string;
    };
};

export type LoginViewContextType = {
    LOGIN_VIEW_STATE: LoginViewState;
    showLogin: () => void;
    showRegister: () => void;
    clearFields: () => void;
};

export type Action = 
    | { type: 'SET_LOGIN_VIEW'; payload: Partial<LoginViewState['registerFields']> }
    | { type: 'SET_REGISTER_VIEW'; payload: Partial<LoginViewState['loginFields']> }
    | { type: 'RESET_FIELDS' };