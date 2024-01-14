import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({Validation, setValidation}) {

    const [ User, setUser ] = useState("");
    const [ Password, setPassword ] = useState("");
    const navigate = useNavigate();

    const checkValidation = () => {
        
        if(User === "Liza Silva" && Password === "123456") {
            setValidation(!Validation);
            navigate('/home');
        }else {
            alert("E-mail ou senha não cadastrados.")
        }
    }

    return(
        <main className="container">
            <div className="containerCardLogin">
                <h1 className="tituloLogin"> Logar </h1>
                <div className="containerLabelInputLogin">
                    <label htmlFor="usuario">Usuario</label>
                    <input type="text" name='usuario' id='usuario' value={User} onChange={(e)=> setUser(e.target.value)} />
                </div>
                <div className="containerLabelInputLogin">
                    <label htmlFor="password">Senha</label>
                    <input type="password" name='password' id='password' value={Password} onChange={(e)=> setPassword(e.target.value)} />
                </div>
                <div className="containerBotoesLogin">
                    <div onClick={ checkValidation } className="botaoLogin" id='botaoPrimarioLogin'>
                        <FontAwesomeIcon icon={faLock} />
                        <p>Log in</p>
                    </div>
                    <div id='dimensionamentoBotao'>
                        <div onClick={ () => navigate('/register') } className="botaoLogin">
                            <p>Criar conta</p>
                        </div>
                        <div onClick={ () => navigate('/forgot-password')} className="botaoLogin">
                            <p>Esqueci a senha</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}