import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContextProvider';
import { Navigate, useNavigate } from 'react-router-dom';


export default function ForgotPassword() {

    const context = useContext(UserContext);
    const [ User, setUser ] = useState("");
    const [ Loading, setLoading ] = useState(false);
    const Navigate = useNavigate();

    const ValidUser = () => {
        const regex = /^[ a-zA-Z]+$/;
        const isValid = regex.test(User) && User.length >= 3 && User.length < 16;
        return isValid;
    }

    const checkValidation = async () => {
        setLoading(true);
        await context.login(User);

        setLoading(false);
    }

    var UserChecker = ValidUser() ? 'Valido' : 'Invalido' ;

    return (
        <main>
            
        </main>
    );
    }