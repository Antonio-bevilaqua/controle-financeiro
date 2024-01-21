import './index.css';
import { useNavigate } from 'react-router-dom';

export default function NoneHome() {
    
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/');
    }
    
    return (
        <main className="container">
            <div className="containerCardLogin">
                <h2 className="tituloLogin"> Opa, você não tem acesso ;-; </h2>
                <div onClick={navigateLogin} className="botaoLogin">
                    <p>Voltar para a página de Login</p>
                </div>
            </div>
        </main>
    );
}