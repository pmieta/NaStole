import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "../components/LoadingIndicator";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [route, setRoute] = useState("/api/token/")
    const [method, setMethod] = useState("login")
    const [name, setName] = useState("Zaloguj się")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                window.location.href = '/';
            } else {
                window.location.replace("/login");
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    const handleSwitchMethod = () => {
        if (method === "login") {
            setMethod("register")
            setRoute("/api/user/register/")
            setName("Zarejestruj się")
        } else {
            setMethod("login")
            setRoute("/api/token/")
            setName("Zaloguj się")
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-container">
                <h1>{name}</h1>
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {loading && <LoadingIndicator />}
                <button className="form-button" type="submit">
                    {name}
                </button>
                {method === "login" ? <p>Nie masz konta? <Link onClick={handleSwitchMethod}>Zarejestruj się</Link></p> :
                    <p>Masz już konto? <Link onClick={handleSwitchMethod}>Zaloguj się</Link></p>}
            </form>
        </div>
    );
}

export default LoginPage