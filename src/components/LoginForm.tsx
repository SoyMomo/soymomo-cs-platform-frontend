'use client'

import { useState } from "react";
import TextField from "@/components/TextField"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

export default function LoginForm() {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);  // Loading state

    async function handleSubmit() {
        setLoading(true)
        console.log('submit')
        console.log(email)
        console.log(password)
    
        const res = await fetch('http://localhost/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
    
        const response = await res.json();

        console.log(response);
    
        if (!res.ok) {
            setError(response.message || 'Something went wrong.');
        } else if (response.challengeName && response.challengeName === 'NEW_PASSWORD_REQUIRED') {
            // If the challenge is NEW_PASSWORD_REQUIRED, redirect to change password page
            setCookie(null, 'session', response.session, { path: '/' })
            router.push(`/change-password?email=${email}`)
        } else {
            // signIn when there's no challenge
            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })
    
            if (signInResponse && !signInResponse.error) {
                router.push('/dashboard')
                console.log('success')
            } else {
                setError("Your email or password is incorrect.")
            }
        }
        setLoading(false)
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