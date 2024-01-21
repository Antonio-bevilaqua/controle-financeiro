import React from 'react'

const UserDropdownContext = React.createContext({
    open: false,
    toggle: () => { },
});

export default UserDropdownContext