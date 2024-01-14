import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import Login from '../componentes/loginpage';
import Home from '../componentes/homepage';
import NoneHome from '../componentes/nonevalidationhome/';
import Register from '../componentes/registerpage';
import ForgotPassword from '../componentes/forgotpasswordpage';

function Rotas(){

    const [ Validation, setValidation ] = useState(false);

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Login Validation={Validation} setValidation={setValidation}  /> }/>
                { Validation && 
                    <Route path='/home' element={ <Home /> }/>
                }
                { !Validation && 
                    <Route path='/home' element={ <NoneHome /> }/>
                }
                <Route path='/register' element={ <Register /> }/>
                <Route path='/forgot-password' element={ <ForgotPassword /> }/>
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;