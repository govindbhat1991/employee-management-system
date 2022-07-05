import React, { useState } from 'react';

interface AuthContextInterface {
    token: string | null;
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextInterface>({
    token: null,
    isLoggedIn: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    login: (token: string) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    logout: () => {},
});

export const AuthContextProvider = (props: any) => {
    const initialToken = sessionStorage.getItem('token');
    const [token, setToken] = useState<string | null>(initialToken);

    const userIsLoggedIn = !!token;

    const loginHandler: AuthContextInterface['login'] = (token) => {
        setToken(token);
        sessionStorage.setItem('token', token);
    };

    const logoutHandler: AuthContextInterface['logout'] = () => {
        setToken(null);
        sessionStorage.removeItem('token');
    };

    const userState: AuthContextInterface = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={userState}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
