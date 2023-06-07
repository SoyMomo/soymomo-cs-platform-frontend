'use client'

import { useState } from "react";
import TextField from "@/components/TextField"

export default function LoginForm() {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit() {
        console.log('submit')
        console.log(user)
        console.log(password)
    }
    return (
        <div>
            <TextField label="Usuario" type="email" setValue={setUser} value={user}/>

            <TextField label="Contraseña" type="password" setValue={setPassword} value={password}/>

            <button
                onClick={handleSubmit}
                className="w-full px-4 py-2 mt-6 text-white bg-[#3CB5C7] hover:bg-cyan-600 rounded-3xl font-poppins"
            >
                Log in
            </button>
        </div>
    )
}