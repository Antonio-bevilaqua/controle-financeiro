import React from 'react'
import ApplicationLogo from '../../ApplicationLogo/ApplicationLogo'
import { Link } from 'react-router-dom'
import UserDropdown from './UserDropdown/UserDropdown'
import NavbarItem from './NavbarItem/NavbarItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator, faCircleInfo, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'
import { menu } from "./data/menu";
import MobileMenu from './MobileMenu/MobileMenu'

const Navbar = () => {
    const mobileBreakpoint = "md";

    const breakpointClasses = {
        "desktop": {
            "sm": "hidden sm:flex",
            "md": "hidden md:flex",
            "lg": "hidden lg:flex",
            "xl": "hidden xl:flex",
        },
        "mobile": {
            "sm": "flex sm:hidden",
            "md": "flex md:hidden",
            "lg": "flex lg:hidden",
            "xl": "flex xl:hidden",
        }
    }

    return (
        <UserDropdown>
            <MobileMenu>
                <nav className="w-full flex justify-center items-center shadow-md shadow-gray-500 fixed top-0 px-4 left-0 z-50 h-16 bg-purple-800">
                    <div className="w-full relative flex items-center lg:max-w-screen-lg xl:max-screen-xl h-full">
                        <Link to="/home">
                            <ApplicationLogo className="flex items-center" imgClassName='w-12 h-12' />
                        </Link>
                        <ul className="flex flex-1 h-full ml-10">
                            {menu.map((item) => (
                                <NavbarItem className={breakpointClasses.desktop[mobileBreakpoint]} to={item.href}>
                                    <FontAwesomeIcon icon={item.icon} className="mr-2 text-lg" /> {item.name}
                                </NavbarItem>
                            ))}
                        </ul>
                        <div className="relative">
                            <UserDropdown.Button className={breakpointClasses.desktop[mobileBreakpoint]} />
                            <MobileMenu.Button className={breakpointClasses.mobile[mobileBreakpoint]}  />
                        </div>
                        <UserDropdown.Menu className={breakpointClasses.desktop[mobileBreakpoint] + " top-16 right-0"} />
                    </div>
                    <MobileMenu.Menu className={breakpointClasses.mobile[mobileBreakpoint] + " flex w-full top-16 left-0"} />
                </nav>
            </MobileMenu>
        </UserDropdown>
    )
}

export default Navbar