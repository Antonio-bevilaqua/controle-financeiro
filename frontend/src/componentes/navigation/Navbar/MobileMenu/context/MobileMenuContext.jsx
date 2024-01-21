import React from 'react'

const MobileMenuContext = React.createContext({
    open: false,
    toggle: () => {},
});

export default MobileMenuContext