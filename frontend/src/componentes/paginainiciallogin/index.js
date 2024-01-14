import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock} from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

export default function Login() {
    return(
        <div className="main">

            <div className="container">

                <div className="containerCardLogin">

                    <h1 className="tituloLogin"> Logar </h1>

                    <div className="campoNomeLogin">
                        <label htmlFor=""> Nome </label>
                        <input type="text" />
                    </div>

                    <div className="campoSenhaLogin">
                        <label htmlFor=""> Senha </label>
                        <input type="password" />
                    </div>

                    <div className="containerBotoesLogin">

                        <div>
                            <FontAwesomeIcon icon={faLock} />
                            <p>Log in</p>
                        </div>
                        <div className="botaoSecundarioLogin"> 
                            <FontAwesomeIcon icon={faUser} />
                            <p>Criar conta</p>
                        </div>
                        <div className="botaoSecundarioLogin"> 
                            <p>Esqueci a senha</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}