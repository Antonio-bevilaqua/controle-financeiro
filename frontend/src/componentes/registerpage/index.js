import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider';

export default function Register() {

    const context = useContext(UserContext);
    const [NewName, setNewName] = useState("");
    const [NewUser, setNewUser] = useState("");
    const [NewEmail, setNewEmail] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const ValidName = () => {
        const regex = /^[a-zA-Z]+$/;
        const isValid = regex.test(NewName) && NewName.length >= 3 && NewName.length < 16;
        return isValid;
    }
    const ValidNewUser = () => {
        const regex = /^[a-zA-Z0-9]+$/;
        const isValid = regex.test(NewUser) && NewUser.length >= 3 && NewUser.length < 16;
        return isValid;
    }
    const ValidNewEmail = () => {
        const regex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)+$/i;
        const isValid = regex.test(NewEmail) && NewEmail.length >= 10 && NewEmail.length < 26;
        return isValid;
    }
    const ValidNewPassword = () => {
        const regex = /^[a-zA-Z0-9]+$/;
        const isValid = regex.test(NewPassword) && NewPassword.length >= 8 && NewPassword.length < 16;
        return isValid;
    }
    const ValidConfirmNewPassword = () => {
        const regex = /^[a-zA-Z0-9]+$/;
        const isValid = regex.test(NewPassword) && (NewPassword === ConfirmPassword);
        return isValid;
    }

    const checkSignIn = async () => {
        setLoading(true);
        const response = await context.SignIn(NewName, NewUser, NewEmail, NewPassword, ConfirmPassword);
        setLoading(false);
        if(response !== false){
            return navigate("/account-pending-validation/"+response.id);
        }
    }

    useEffect(() => {
        if (context.isLoggedIn()) {
            navigate('/home');
        }
    }, [context.user, context.token, context, navigate]);

    var NameChecker = ValidName() ? 'Valido' : 'Invalido' ;
    var UserChecker = ValidNewUser() ? 'Valido' : 'Invalido' ;
    var EmailChecker = ValidNewEmail() ? 'Valido' : 'Invalido' ;
    var PasswordChecker = ValidNewPassword() ? 'Valido' : 'Invalido' ;
    var ConfirmPasswordChecker = ValidConfirmNewPassword() ? 'Valido' : 'Invalido' ;

    return (
        <main className='container'>
            <div className="containerCard">
                <h1 className='tituloRegistro'>Cadastrar Conta</h1>
                <div id='espacamentoLabel'>
                    <div className="containerLabelInputRegister">
                        <label htmlFor="nome">Nome</label>
                        <input className={`${NameChecker}`} type="text" name='nome' id={'nome'} value={NewName} onChange={(e) => setNewName(e.target.value)} minLength={3} maxLength={15} />
                    </div>
                    <div className="containerLabelInputRegister">
                        <label htmlFor="usuario">Usuario</label>
                        <input className={`${UserChecker}`} type="text" name='usuario' id={`usuario`} value={NewUser} onChange={(e) => setNewUser(e.target.value)} minLength={3} maxLength={15} />
                    </div>
                    <div className="containerLabelInputRegister">
                        <label htmlFor="email">E-mail</label>
                        <input className={`${EmailChecker}`} type='email' name='email' id={`email`} value={NewEmail} onChange={(e) => setNewEmail(e.target.value)} minLength={10} maxLength={25} />
                    </div>
                    <div className="containerLabelInputRegister">
                        <label htmlFor="newpassword">Senha</label>
                        <input className={`${PasswordChecker}`} type='password' name='newpassword' id={`newpassword`} value={NewPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={8} maxLength={15}/>
                    </div>
                    <div className="containerLabelInputRegister">
                        <label htmlFor="usuario">Confirmação de senha</label>
                        <input  className={`${ConfirmPasswordChecker}`} type='password' name='newpassword' id={`newpassword`} value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} minLength={8} maxLength={15} />
                    </div>
                </div>
                <div className="containerBotoesRegister">
                    <div onClick={checkSignIn} className="botaoRegister" disabled={loading} id='botaoPrimarioRegister'>
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
                    <div>
                        <div onClick={() => navigate('/')} className="botaoRegister" id='botaoVoltarRegister'>
                            <p>Voltar</p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}