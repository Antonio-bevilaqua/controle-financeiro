import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider';

export default function Login() {
    const context = useContext(UserContext);
    const [User, setUser] = useState("");
    const [Password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const checkValidation = async () => {
        setLoading(true);
        await context.login(User, Password);

        setLoading(false);
    }

    useEffect(() => {
        if (context.isLoggedIn()) {
            navigate('/home');
        }
    }, [context.user, context.token]);

    return (
        <main className="container">
            <div className="containerCardLogin">
                <h1 className="tituloLogin"> Logar </h1>
                <div className="containerLabelInputLogin">
                    <label htmlFor="usuario">Usuario</label>
                    <input type="text" name='usuario' id='usuario' value={User} onChange={(e) => setUser(e.target.value)} />
                </div>
                <div className="containerLabelInputLogin">
                    <label htmlFor="password">Senha</label>
                    <input type="password" name='password' id='password' value={Password} onChange={(e) => setPassword(e.target.value)} />
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