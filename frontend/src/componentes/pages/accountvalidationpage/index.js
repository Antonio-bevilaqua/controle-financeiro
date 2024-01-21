import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSignIn, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import useApiFetcher from '../../../hooks/useApiFetcher';


export default function AccountValidationPage() {
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const urlSearchParams = useSearchParams();
    const params = urlSearchParams[0];
    const token = params.get("token");
    const fetcher = useApiFetcher();

    const sendValidationRequest = async () => {
        if (undefined === token || !token) {
            return navigate('/');
        }

        const response = await fetcher.post('php', 'activate', {
            'token': token
        }, true);

        if (response === null) {
            return navigate('/');
        }

        setLoading(false);
        if (response.type !== undefined && response.type === "error") {
            return setErrors(response.data);
        }
    }
    useEffect(() => {
        sendValidationRequest();
        // eslint-disable-next-line
    }, [])

    if (loading) return (
        <main className="container">
            <div className="flex flex-col justify-center items-center bg-gray-200 max-w-full sm:max-w-lg bg-opacity-85 rounded-lg px-8 py-8 shadow-md">
                <div className='flex w-full justify-center items-center gap-4 pb-8'>
                    <FontAwesomeIcon icon={faSpinner} spin className='text-5xl' />
                    <h1 className="text-3xl font-bold" >
                        Validando Conta
                    </h1>
                </div>

                <p className="border-t-2 border-gray-600 text-gray-800 font-semibold pt-8 pb-8 text-xl w-full">
                    Aguarde, estamos validando sua conta...
                </p>

                <div className='border-t-2 border-gray-600 w-full text-gray-800 flex font-semibold pt-4'>
                    <Link className='bg-black rounded-2xl w-full py-3 text-center text-white opacity-80 hover:opacity-100 transition-all font-semibold mt-5 text-md' to="/">
                        <FontAwesomeIcon icon={faSignIn} className='mr-2' />
                        Voltar ao Login
                    </Link>
                </div>
            </div>
        </main >
    )

    if (errors !== null) return (
        <main className="container">
            <div className="flex flex-col justify-center items-center bg-gray-200 max-w-full sm:max-w-lg bg-opacity-85 rounded-lg px-8 py-8 shadow-md">
                <div className='flex w-full justify-center text-red-800 items-center gap-4 pb-8'>
                    <FontAwesomeIcon icon={faTimesCircle} className='text-6xl' />
                    <h1 className="text-3xl font-bold" >
                        Ops... Algo Ocorreu!
                    </h1>
                </div>

                <p className="border-t-2 border-gray-600 text-gray-800 font-semibold pt-8 pb-8 text-xl w-full">
                    {errors.map((error, idx) => (
                        <React.Fragment key={`error${idx}`} >{error}</React.Fragment>
                    ))}
                </p>

                <div className='border-t-2 border-gray-600 w-full text-gray-800 flex font-semibold pt-4'>
                    <Link className='bg-black rounded-2xl w-full py-3 text-center text-white opacity-80 hover:opacity-100 transition-all font-semibold mt-5 text-md' to="/">
                        <FontAwesomeIcon icon={faSignIn} className='mr-2' />
                        Voltar ao Login
                    </Link>
                </div>
            </div>
        </main >
    )

    return (
        <main className="container">
            <div className="flex flex-col justify-center items-center bg-gray-200 max-w-full sm:max-w-lg bg-opacity-85 rounded-lg px-8 py-8 shadow-md">
                <div className='flex w-full justify-center text-green-800 items-center gap-4 pb-8'>
                    <FontAwesomeIcon icon={faCheckCircle} className='text-6xl' />
                    <h1 className="text-3xl font-bold" >
                        Conta Validada
                    </h1>
                </div>

                <p className="border-t-2 border-gray-600 text-gray-800 font-semibold pt-8 pb-8 text-xl w-full">
                    Sua conta foi validada sucesso e agora basta acessá-la através da página de login!
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