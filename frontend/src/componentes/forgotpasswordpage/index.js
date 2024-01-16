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
        <main className='containerForgotPassword'>
            <div className="card">
                <h2>Recuperar Senha</h2>

                <div className="containerLabelInputPassword">
                    <label htmlFor="usuario"> E-mail da conta</label>
                    <input className={`${UserChecker}`} type="text" name="usuario" id={'usuario'} value={User} onChange={(e) => setUser(e.target.value)} minLength={3} maxLength={15} />
                </div>

                <div className="containerBotoesLogin">
                    <div onClick={checkValidation} className='botaoLogin' disabled={Loading} id="botaoPrimarioPassword">
                        {Loading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin />
                                <p>Continuar</p>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faLock} />
                                <p>Continuar</p>
                            </>
                        )}
                    </div>
                    <div id="containerBotaoVoltar">
                        <div onClick={ () => Navigate('/')} className='botaoRetornar'>
                            <p>Retornar</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}