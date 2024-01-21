import React from 'react'

const ApplicationLogo = ({ className = "", imgClassName="" }) => {
    return (
        <div className={className}>
            <img src="/assets/logos/logo-dollar-coin.png" className={imgClassName} alt="Ícone moeda dolar" />
            <div className="flex flex-col items-start justify-center text-md font-extrabold ml-1">
                <span className="text-fuchsia-400">Controle</span>
                <span className="text-fuchsia-100 -mt-2">Financeiro</span>
            </div>
        </div>
    )
}

export default ApplicationLogo