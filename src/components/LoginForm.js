import { useState } from "react";
import TextField from "./TextField"
import axios from "axios";
import AuthContext from "../authContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Cookies from 'js-cookie';

export default function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);  // Loading state
    const { setTokens } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit() {
        // start loading
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_HOST + "/auth/login",
                {
                    email,
                    password,
                }
            );
            if (response.data.challengeName && response.data.challengeName === 'NEW_PASSWORD_REQUIRED') {
                // navegar a vista cambiar contraseña
                Cookies.set('session', response.data.session);
                navigate('/change-password?email=' + email);
               
            } else {
                // iniciar sesión y navegar a dashboard
                setTokens(response.data);
                navigate('/');
            }
        } catch (error) {
            // handle the error
            setError(error.message || "Something went wrong.");
        } finally {
            // stop loading
            setLoading(false);
        }
    }
    
    return (
        <div>
            {error && (
                <span className="block w-full px-4 py-2 mt-6 text-white bg-red-500 rounded-3xl font-poppins">
                    {error}
                </span>
            )}
            <TextField label="Email" type="email" setValue={setEmail} value={email}/>

            <TextField label="Contraseña" type="password" setValue={setPassword} value={password}/>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full px-4 py-2 mt-6 text-white bg-[#3CB5C7] hover:bg-cyan-600 rounded-3xl font-poppins"
            >
                {loading? "Loading..." : "Log in"} 
            </button>
        </div>
    )
}