import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContextProvider';
import Form from '../../Form/Form';
import { formData } from './formData/formData';

export default function Register() {

    const context = useContext(UserContext);
    const navigate = useNavigate();

    const checkSignIn = (response) => {
        if (response !== false) {
            return navigate("/account-pending-validation/" + response.id);
        }
    }

    useEffect(() => {
        if (context.isLoggedIn()) {
            navigate('/home');
        }
    }, [context.user, context.token, context, navigate]);

    return (
        <main className='container'>
            <div className="containerCard">
                <h1 className='tituloRegistro'>Cadastrar Conta</h1>
                <Form api="php" action="register" className="w-full flex flex-col items-center" values={formData} >
                    <div id='espacamentoLabel'>
                        <div className="containerLabelInputRegister">
                            <label htmlFor="name">Nome</label>
                            <Form.Input name='name' />
                        </div>
                        <div className="containerLabelInputRegister">
                            <label htmlFor="username">Usuario</label>
                            <Form.Input name='username' />
                        </div>
                        <div className="containerLabelInputRegister">
                            <label htmlFor="email">E-mail</label>
                            <Form.Input name='email' />
                        </div>
                        <div className="containerLabelInputRegister">
                            <label htmlFor="password">Senha</label>
                            <Form.Input type="password" name='password' />
                        </div>
                        <div className="containerLabelInputRegister">
                            <label htmlFor="password_confirmation">Confirmação de senha</label>
                            <Form.Input type="password" name='password_confirmation' />
                        </div>
                    </div>
                    <div className="containerBotoesRegister mt-4">
                        <Form.Submit onSuccess={checkSignIn} className="w-full">
                            <FontAwesomeIcon icon={faCheck} className="pr-2" /> Registrar-se
                        </Form.Submit>
                        <div>
                            <div onClick={() => navigate('/')} className="botaoRegister" id='botaoVoltarRegister'>
                                <p>Voltar</p>
                            </div>
                        </div>
                    </div>
                </Form>

            </div>
        </main>
    );
}