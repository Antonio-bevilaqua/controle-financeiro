import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';


export default function AccountCreatedPage() {

    return (
        <main className="container">
            <div className="flex flex-col justify-center items-center bg-gray-200 max-w-full sm:max-w-lg bg-opacity-85 rounded-lg px-8 py-8 shadow-md">
                <div className='flex w-full justify-center items-center gap-4 pb-8'>
                    <FontAwesomeIcon icon={faEnvelope} className='text-6xl' />
                    <h1 className="text-3xl font-bold" >
                        Validar Conta
                    </h1>
                </div>

                <p className="border-t-2 border-gray-600 text-gray-800 font-semibold pt-8 pb-8 text-xl">
                    Sua conta foi cadastrada com sucesso porém está pendente de validação, verifique a caixa de entrada do seu e-mail cadastrado para informações de como validá-la!
                </p>

                <div className='border-t-2 border-gray-600 w-full text-gray-800 flex font-semibold pt-4'>
                    <Link className='bg-black rounded-2xl w-full py-3 text-center text-white opacity-80 hover:opacity-100 transition-all font-semibold mt-5 text-md' to="/">
                        <FontAwesomeIcon icon={faSignIn} className='mr-2' />
                        Voltar ao Login
                    </Link>
                </div>
            </div>
        </main >
    );
}