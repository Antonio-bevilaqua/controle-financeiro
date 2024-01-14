import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock} from '@fortawesome/free-solid-svg-icons'

export default function Login() {
    return(
        <main className="container">
            <div className="containerCardLogin">
                <h1 className="tituloLogin"> Logar </h1>
                <div className="containerLabelInputLogin">
                    <label htmlFor="usuario">Usuario</label>
                    <input type="text" name='usuario' id='usuario' />
                </div>
                <div className="containerLabelInputLogin">
                    <label htmlFor="password">Senha</label>
                    <input type="password" name='password' id='password' />
                </div>
                <div className="containerBotoesLogin">
                    <div  className="botaoLogin" id='botaoPrimarioLogin'>
                        <FontAwesomeIcon icon={faLock} />
                        <p>Log in</p>
                    </div>
                    <div id='dimensionamentoBotao'>
                        <div className="botaoLogin">
                            <p>Criar conta</p>
                        </div>
                        <div className="botaoLogin">
                            <p>Esqueci a senha</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}