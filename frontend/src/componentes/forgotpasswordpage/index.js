import './index.css';


export default function ForgotPassword() {
    return (
    <div className="main-box">
        <h1>recuperar senha</h1>
        <form action="">
            <div className="input-box">
                <label>nova senha</label>
                <input type="email" required />
            </div>
            <div className="input-box">
                <label>confirmar senha</label>
                <input type="password" required />
            </div>
            <div className="check">
                <label>confirmar senha</label>
                <input type="password"></input>
            </div>
        </form>
    </div>
    );
}