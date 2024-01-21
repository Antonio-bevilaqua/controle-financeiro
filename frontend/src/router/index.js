import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../componentes/pages/loginpage';
import Home from '../componentes/pages/homepage';
import Register from '../componentes/pages/registerpage';
import ForgotPassword from '../componentes/pages/forgotpasswordpage';
import RequireLogin from '../componentes/pages/authentication/RequireLogin';
import RequireGuest from '../componentes/pages/authentication/RequireGuest';
import AccountCreatedPage from '../componentes/pages/accountpendingvalidationpage';
import AccountValidationPage from '../componentes/pages/accountvalidationpage';
import LogoffPage from '../componentes/pages/logoffpage';

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

                <Route path='/logoff' element={
                    <RequireLogin>
                        <LogoffPage />
                    </RequireLogin>
                } />

            </Routes>
        </BrowserRouter >
    );
}

export default Rotas;