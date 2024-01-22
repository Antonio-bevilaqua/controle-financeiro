import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/UserContextProvider';
import { useNavigate } from 'react-router-dom';

const RequireGuest = ({ children }) => {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
        if (context.isLoggedIn()) {
            navigate('/home');
        }
        // eslint-disable-next-line
    }, [context.user, context.token]);

    if (!loaded) {
        return <></>
    }

    return (
        <>
            {children}
        </>
    )
}

export default RequireGuest;