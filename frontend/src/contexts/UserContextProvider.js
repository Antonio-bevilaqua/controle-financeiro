import React, { useEffect, useState } from 'react'
import useApiFetcher from '../hooks/useApiFetcher';

export const UserContext = React.createContext({
    user: {},
    setUser: () => { },
    token: '',
    setToken: () => { },
    login: async () => { },
    logoff: () => { },
    isLoggedIn: () => { },
});

const UserContextProvider = ({ children }) => {
    const fetcher = useApiFetcher();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'));
        const token = JSON.parse(localStorage.getItem('token'));

        if (data !== null) {
            setUser(data);
        }

        if (token !== null) {
            setToken(token);
        }

        setLoaded(true);
    }, []);

    const login = async (username, password) => {
        const response = await fetcher.post('php', 'login', {
            username: username,
            password: password
        });

        if (response === null) {
            return false;
        }

        setUser(response.user);
        setToken(response.token);
        saveUserAndToken(response.user, response.token);
        return true;
    }

    const SignIn = async (NewName, NewUser, NewEmail, NewPassword, ConfirmPassword) => {
        const response = await fetcher.post('php', 'login', {
            name: NewName,
            username: NewUser,
            email: NewEmail,
            password: NewPassword,
            password_confirmation: ConfirmPassword
        });

        if (response === null) {
            return false;
        }

        return response;
    }
    const SendMail = async (ConfirmMail) => {
        const response = await fetcher.post('php', 'login', {
            email: ConfirmMail
        });

        if (response === null) {
            return false;
        }

        return true;
    }

    const saveUserAndToken = (user, token) => {
        localStorage.setItem('userData', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));
    }

    const logoff = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
    }

    const isLoggedIn = () => {
        return (user !== null);
    }

    if (!loaded) return <></>;

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                SignIn,
                SendMail,
                login,
                logoff,
                isLoggedIn
            }}
        >
            {children}
        </UserContext.Provider>
    )
}


export default UserContextProvider