import { useState } from "react";
import TextField from "./TextField"

export default function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);  // Loading state

    async function handleSubmit() {

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