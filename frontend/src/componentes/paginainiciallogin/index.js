import './index.css';

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

                        <button>
                            <img src="../../assets/cadeado.svg" alt="" /> Log in
                        </button>

                        <button className="botaoSecundarioLogin"> Criar conta
                        </button>

                        <button className="botaoSecundarioLogin"> Esqueci a senha
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}