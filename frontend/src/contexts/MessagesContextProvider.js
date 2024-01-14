import React, { useState } from 'react';
import './message.css';

export const MessagesContext = React.createContext({
    showMessage: () => { }
});

const MessagesContextProvider = ({ children }) => {
    const [messages, setMessages] = useState({});
    const [type, setType] = useState('');
    const [alert, setAlert] = useState(false);

    const showMessage = (messages, type = 'error', timeout = 30000) => {
        setMessages(messages);
        setAlert(true);
        setType(type);


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