import React, { useContext } from 'react'
import { UserContext } from '../../../contexts/UserContextProvider'

const LogoffPage = () => {
    const ctx = useContext(UserContext);
    ctx.logoff();

    return (
        <></>
    )
}

export default LogoffPage