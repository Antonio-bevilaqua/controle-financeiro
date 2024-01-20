import React, { useState } from 'react';
import './message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

export const MessagesContext = React.createContext({
    showMessage: () => { }
});

const MessagesContextProvider = ({ children }) => {
    const [messages, setMessages] = useState({});
    const [timeout, setStateTimeout] = useState(null);
    const [alert, setAlert] = useState(false);

    const showMessage = (message, timeout = 5000) => {
        setMessages(message);
        setAlert(true);
        setStateTimeout(timeout);

        setTimeout(closeMessage, timeout);
    }


    const closeMessage = (e) => {
        if (e) {
            e.preventDefault();
        }
        setMessages({});
        setAlert(false);
        setStateTimeout(null);
    }


    return (
        <>
            <div className="fixed top-0 left-0 w-full flex justify-center">
                <div className={`${Object.keys(messages).length > 0 && alert ?
                    "relative flex flex-col gap-2 bg-red-300 border-2 border-red-800 rounded-md px-4 pb-2 pt-5 text-red-900"
                    : ""}`}>
                    {Object.keys(messages).length > 0 && alert && (<>
                        <div className='absolute top-0 right-0 mr-2 mt-0'>
                            <button type="button" onClick={closeMessage} >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        {Object.keys(messages).map((key, id) => (
                            <div key={'msg' + id}>
                                <FontAwesomeIcon icon={faExclamationTriangle} className='mr-2' />
                                {messages[key]}
                            </div>
                        ))}
                    </>)}

                    <div className='mt-1 bg-red-900 rounded-md' style={{
                        transition: `width ${timeout}ms linear`,
                        width: timeout ? '100%' : '0px',
                        height: timeout ? '3px' : '0px',
                    }}>
                    </div>
                </div>
            </div >
            <MessagesContext.Provider
                value={{
                    showMessage
                }}
            >
                {children}
            </MessagesContext.Provider>
        </>
    )
}

export default MessagesContextProvider