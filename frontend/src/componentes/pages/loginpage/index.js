import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContextProvider';
import ApplicationLogo from '../../ApplicationLogo/ApplicationLogo';

export default function Login() {
    const context = useContext(UserContext);
    const [User, setUser] = useState("");
    const [Password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const ValidUser = () => {
        const regex = /^[a-zA-Z0-9]+$/;
        const isValid = regex.test(User) && User.length >= 3 && User.length < 16;
        return isValid;
    }
    const ValidPassword = () => {
        const regex = /^[a-zA-Z0-9]+$/;
        const isValid = regex.test(Password) && Password.length >= 8 && Password.length < 16;
        return isValid;
    }

    const checkValidation = async () => {
        setLoading(true);
        await context.login(User, Password);

        setLoading(false);
    }

    useEffect(() => {
        if (context.isLoggedIn()) {
            navigate('/home');
        }
    }, [context.user, context.token, context, navigate]);

    var UserChecker = ValidUser() ? 'Valido' : 'Invalido';
    var PasswordChecker = ValidPassword() ? 'Valido' : 'Invalido';

    return (
        <main className="container">
            <div className="containerCardLogin">
                <h1 className="tituloLogin"> Logar </h1>
                <div className="containerLabelInputLogin" >
                    <label htmlFor="usuario">Usuario</label>
                    <input className={`${UserChecker}`} type="text" name='usuario' id={`usuario`} value={User} onChange={(e) => setUser(e.target.value)} minLength={3} maxLength={15} />
                </div>
                <div className="containerLabelInputLogin">
                    <label htmlFor="password">Senha</label>
                    <input className={`${PasswordChecker}`} type="password" name='password' id='password' value={Password} onChange={(e) => setPassword(e.target.value)} minLength={8} maxLength={15} />
                </div>
                <div className="containerBotoesLogin">
                    <div onClick={checkValidation} className="botaoLogin" disabled={loading} id='botaoPrimarioLogin'>
                        {loading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin />
                                <p>Log in</p>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faLock} />
                                <p>Log in</p>
                            </>
                        )}
                    </div>
                    <div id='dimensionamentoBotao'>
                        <div onClick={() => navigate('/register')} className="botaoLogin">
                            <p>Criar conta</p>
                        </div>
                        <div onClick={() => navigate('/forgot-password')} className="botaoLogin">
                            <p>Esqueci a senha</p>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}