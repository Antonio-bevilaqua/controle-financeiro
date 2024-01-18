import React, { useState } from 'react';
import './message.css';

export const MessagesContext = React.createContext({
    showMessage: () => { }
});

const MessagesContextProvider = ({ children }) => {
    const [messages, setMessages] = useState({});
    const [alert, setAlert] = useState(false);

    const showMessage = ( timeout = 3000) => {
        setMessages(messages);
        setAlert(true);


        setTimeout(() => {
            setMessages({});
            setAlert(false);
        }, timeout);
    }

    return (
        <>
            <div>
                {Object.keys(messages).length > 0 && alert && (
                    <div id='Alert'>
                        {Object.keys(messages).map((key, id) => (
                            <div key={'msg' + id}>{messages[key]}</div>
                        ))}
                    </div>
                )}
            </div>
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