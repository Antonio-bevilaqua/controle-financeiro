import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider';

export default function Register() {

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

    var UserChecker = ValidUser() ? 'Valido' : 'Invalido' ;
    var PasswordChecker = ValidPassword() ? 'Valido' : 'Invalido' ;

    return (
        <main className='container'>
            <div className="containerCard">
                <h1 className='tituloRegistro'>Criar Senha</h1>
                <div id='espacamentoLabel'>
                    <div className="containerLabelInputRegister">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" name='nome' id={'nome'}/>
                    </div>
                    <div className="containerLabelInputRegister">
                        <label htmlFor="usuario">Usuario</label>
                        <input className={`${UserChecker}`} type="text" name='usuario' id={`usuario`} value={User} onChange={(e) => setUser(e.target.value)} minLength={3} maxLength={15} />
                    </div>
                    <div className="containerLabelInputRegister">
                        <label htmlFor="usuario">E-mail</label>
                        <input type='text'/>
                    </div>
                    <div className="containerLabelInputRegister">
                        <label htmlFor="usuario">Senha</label>
                        <input type='password'/>
                    </div>
                    <div className="containerLabelInputRegister">
                        <label htmlFor="usuario">Confirmação de senha</label>
                        <input type='password'/>
                    </div>
                </div>
                <div className="containerBotoesRegister">
                    <div onClick={checkValidation} className="botaoRegister" disabled={loading} id='botaoPrimarioRegister'>
                        {loading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin />
                                <p>Aguarde...</p>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faUser} />
                                <p>Registrar-se</p>
                            </>
                        )}
                    </div>
                    <div id=''>
                        <div onClick={() => navigate('/')} className="botaoRegister" id='botaoVoltarRegister'>
                            <p>Voltar</p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}