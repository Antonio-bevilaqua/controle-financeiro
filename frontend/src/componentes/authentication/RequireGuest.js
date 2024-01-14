import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContextProvider';
import { useNavigate } from 'react-router-dom';

const RequireGuest = ({ children }) => {
    const navigate = useNavigate();
    const context = useContext(UserContext);

    useEffect(() => {
        if (context.isLoggedIn()) {
            navigate('/home');
        }
    }, [context.user, context.token]);

    return (
        <>
            {children}
        </>
    )
}

export default RequireGuest