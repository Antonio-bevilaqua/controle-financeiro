import { useContext } from 'react';
import './index.css';
import { UserContext } from '../../../contexts/UserContextProvider';
import Template from '../../template/Template';

export default function Home() {
    const context = useContext(UserContext);
    return (
        <Template>
            Opa, home foi !
            <button onClick={() => context.logoff()} >SAIR!</button>
        </Template>
    );
}