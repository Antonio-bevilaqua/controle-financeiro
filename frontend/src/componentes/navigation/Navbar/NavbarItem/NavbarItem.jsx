import React from 'react'
import { Link } from 'react-router-dom'

const NavbarItem = ({ children, className = "", ...props }) => {
    return (
        <li className="flex-col h-full transition-all hover:bg-fuchsia-600 text-fuchsia-200">
            <Link className={'w-full h-full px-6 flex justify-center font-bold mt-2 items-center text-sm ' + className} {...props} >
                {children}
            </Link>
        </li>
    )
}

export default NavbarItem