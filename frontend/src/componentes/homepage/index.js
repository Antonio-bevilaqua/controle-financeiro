import { useContext } from 'react';
import './index.css';
import { UserContext } from '../../contexts/UserContextProvider';

export default function Home() {
    const context = useContext(UserContext);
    return (
        <main>
            Opa, home foi !
            <button onClick={() => context.logoff()} >SAIR!</button>
        </main>
    );
}