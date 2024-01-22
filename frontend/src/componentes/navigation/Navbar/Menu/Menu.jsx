import React, { useContext } from 'react'
import { UserContext } from '../../../../contexts/UserContextProvider';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Menu = ({ open, className, data }) => {
    const { user } = useContext(UserContext);

    return (
        <div className={'absolute bg-purple-800 shadow-md rounded-b-md shadow-gray-500 flex-col z-40 py-4 transition-all ' + className} style={{
            transformOrigin: "top center",
            transform: `scaleY(${open ? 1 : 0})`
        }}>
            <span className="flex gap-1 items-center px-4 text-gray-100 font-bold">
                Olá {user.name}!
            </span>
            <span className="flex gap-1 mt-2 mb-2 px-4 items-center text-gray-100">
                <span className='w-6'>
                    <FontAwesomeIcon icon={faEnvelope} />
                </span>
                {user.email}
            </span>

            <ul className="flex flex-col border-t-2 gap-2 border-gray-200 pt-2 mt-2">
                {data.map((item, idx) => (
                    <li className='list-none' key={`menu-data-${idx}`}>
                        <Link to={item.href} className="flex transition-all border-l-4 px-3 border-purple-800 text-gray-100 hover:text-fuchsia-400 hover:border-fuchsia-400">
                            <span className='w-6'>
                                <FontAwesomeIcon icon={item.icon} />
                            </span>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Menu