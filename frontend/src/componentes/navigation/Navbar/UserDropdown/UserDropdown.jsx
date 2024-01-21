import React, { useContext, useState } from 'react'
import UserDropdownContext from './context/UserDropdownContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../../contexts/UserContextProvider';
import { dropdown } from './data/dropdown';
import Menu from '../Menu/Menu';

const UserDropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <UserDropdownContext.Provider value={{
            open,
            toggle: () => setOpen(!open)
        }} >
            {children}
        </UserDropdownContext.Provider>
    );
}


const UserDropdownMenu = ({ className = "" }) => {
    const ctx = useContext(UserDropdownContext);

    return (
        <Menu
            open={ctx.open}
            className={className}
            data={[...dropdown]}
        />
    )
}

const UserDropdownButton = ({className = ""}) => {
    const { open, toggle } = useContext(UserDropdownContext);
    const { user } = useContext(UserContext);

    return (
        <button className={"items-center text-md text-gray-100 text-xl " + className} onClick={toggle} >
            <FontAwesomeIcon icon={faCircleUser} className="text-3xl mr-2" /> {user.username}
            <FontAwesomeIcon icon={open ? faCaretUp : faCaretDown} className='text-xs mt-1 ml-1' />
        </button>
    )
}

UserDropdown.Menu = UserDropdownMenu;
UserDropdown.Button = UserDropdownButton;

export default UserDropdown