import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider';


export default function ForgotPassword() {
    const context = useContext(UserContext);
    const [SendedMail, setSendedMail] = useState(false);
    const [ConfirmMail, setConfirmMail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const CoverEmail = () => {
        const regex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)+$/i;
        const isValid = regex.test(ConfirmMail) && ConfirmMail.length >= 10 && ConfirmMail.length < 26;
        return isValid;
    }

    const SendingMail = async () => {
        setLoading(true);
        const response = await context.SendMail(ConfirmMail);
        setLoading(false);
        setSendedMail(response);
    }

    useEffect(() => {
        if (context.isLoggedIn()) {
            navigate('/home');
        }
    }, [context.user, context.token, context, navigate ]);

    
    var EmailChecker = CoverEmail() ? 'Valido' : 'Invalido' ;
    var BackCard = SendedMail ? 'Valido' : '' ;

    return (
        <main className={`container`}>
            <div className="containerCardLogin"  id={`${BackCard}`}>
                {!SendedMail ? (
                    <>
                        <h1 className="tituloLogin"> Recuperar Conta</h1>
                        <div className="containerLabelInputLogin">
                                <label htmlFor="email">E-mail</label>
                                <input className={`${EmailChecker}`} type='email' name='email' id={`email`} value={ConfirmMail} onChange={(e) => setConfirmMail(e.target.value)} minLength={10} maxLength={25} />
                            </div>
                        <div className="containerBotoesLogin">
                            <div onClick={SendingMail} className="botaoLogin" disabled={loading} id='botaoPrimarioLogin'>
                                {loading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin />
                                        <p>Enviar Email</p>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
                                        <p>Enviar Email</p>
                                    </>
                                )}
                            </div>
                            <div>
                                <div onClick={() => navigate('/')} className="botaoLogin">
                                    <p>Volta</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="tituloLogin" id='enviado'> E-mail enviado com sucesso</h1>
                        <div className="containerBotoesLogin">
                            <div>
                                <div onClick={() => navigate('/')} className="botaoLogin">
                                    <p>Volta</p>
                                </div>
                            </div>
                        </div>                    
                    </>
                )}
            </div>
        </main >
       
    );
}