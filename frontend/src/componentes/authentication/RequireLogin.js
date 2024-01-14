import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContextProvider';
import { useNavigate } from 'react-router-dom';

const RequireLogin = ({ children }) => {
    const navigate = useNavigate();
    const context = useContext(UserContext);

    useEffect(() => {
        if (!context.isLoggedIn()) {
            navigate('/');
        }
    }, [context.user, context.token]);

    return (
        <>
            {children}
        </>
    )
}

export default RequireLogin