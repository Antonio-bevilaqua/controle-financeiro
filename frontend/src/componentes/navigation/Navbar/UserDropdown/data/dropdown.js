import { faLock, faSignOut, faUserCog } from "@fortawesome/free-solid-svg-icons";

export const dropdown = [
    {
        href: '/seguranca',
        icon: faLock,
        name: "Segurança"
    },
    {
        href: '/meu-perfil',
        icon: faUserCog,
        name: "Meu Perfil"
    },
    {
        href: '/logoff',
        icon: faSignOut,
        name: "Sair"
    }
]