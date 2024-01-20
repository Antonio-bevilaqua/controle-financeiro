import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../componentes/loginpage';
import Home from '../componentes/homepage';
import Register from '../componentes/registerpage';
import ForgotPassword from '../componentes/forgotpasswordpage';
import RequireLogin from '../componentes/authentication/RequireLogin';
import RequireGuest from '../componentes/authentication/RequireGuest';
import AccountCreatedPage from '../componentes/accountpendingvalidationpage';
import AccountValidationPage from '../componentes/accountvalidationpage';

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <RequireGuest>
                        <Login />
                    </RequireGuest>
                } />
                <Route path='/register' element={
                    <RequireGuest>
                        <Register />
                    </RequireGuest>
                } />
                <Route path='/forgot-password' element={
                    <RequireGuest>
                        <ForgotPassword />
                    </RequireGuest>
                } />

                <Route path='/account-pending-validation/:userId' element={
                    <RequireGuest>
                        <AccountCreatedPage />
                    </RequireGuest>
                } />

                <Route path='/ativar-conta' element={
                    <RequireGuest>
                        <AccountValidationPage />
                    </RequireGuest>
                } />


                <Route path='/home' element={
                    <RequireLogin>
                        <Home />
                    </RequireLogin>
                } />

            </Routes>
        </BrowserRouter >
    );
}

export default Rotas;