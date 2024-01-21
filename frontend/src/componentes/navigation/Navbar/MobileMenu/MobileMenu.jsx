import React, { useContext, useState } from 'react'
import MobileMenuContext from './context/MobileMenuContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { dropdown } from '../UserDropdown/data/dropdown';
import { menu } from '../data/menu';
import Menu from '../Menu/Menu';

const MobileMenu = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <MobileMenuContext.Provider value={{
            open,
            toggle: () => setOpen(!open)
        }}>
            {children}
        </MobileMenuContext.Provider>
    )
}

const Button = ({ className = "" }) => {
    const ctx = useContext(MobileMenuContext);

    return (
        <button className={"w-10 h-11 justify-center items-center rounded-md transition-colors bg-fuchsia-400 text-purple-800 hover:bg-fuchsia-300 " + className} onClick={ctx.toggle}>
            <FontAwesomeIcon icon={ctx.open ? faTimes : faBars} className="text-xl" />
        </button>
    )
}

const MobileMenuDropdown = ({ className = '' }) => {
    const ctx = useContext(MobileMenuContext);

    return (
        <Menu
            open={ctx.open}
            className={className}
            data={[...menu, ...dropdown]}
        />
    )
}

MobileMenu.Button = Button;
MobileMenu.Menu = MobileMenuDropdown;

export default MobileMenu