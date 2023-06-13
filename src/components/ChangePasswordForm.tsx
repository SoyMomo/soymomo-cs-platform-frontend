'use client'
import { useState } from "react";
import TextField from "@/components/TextField"
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useSearchParams } from 'next/navigation'
import { signIn } from "next-auth/react";

export default function ChangePasswordForm() {

    const router = useRouter()

    const searchParams = useSearchParams()
 
    const email = searchParams.get('email')

    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);  // Loading state

    const { session } = parseCookies();

    async function handleSubmit() {
        setLoading(true)
        console.log('submit')
        console.log(newPassword)

        const res = await fetch('http://localhost/auth/respondToAuthChallenge', {
            method: 'POST',
            body: JSON.stringify({
                challengeName: 'NEW_PASSWORD_REQUIRED',
                challengeResponses: {
                    USERNAME: email, // assuming `email` is in scope
                    NEW_PASSWORD: newPassword,
                },
                session,
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await res.json();

        if (!res.ok) {
            setError(response.message || 'Something went wrong.');
        } else {
            // Login again with the new password
            const signInResponse = await signIn('credentials', {
                email,
                password: newPassword,
                redirect: false,
            })
            if (signInResponse && signInResponse.error) {
                setError("Your email or password is incorrect.")
            } else if (signInResponse) {
                router.push('/dashboard')
                console.log('success')
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
            <TextField label="New Password" type="password" setValue={setNewPassword} value={newPassword}/>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full px-4 py-2 mt-6 text-white bg-[#3CB5C7] hover:bg-cyan-600 rounded-3xl font-poppins`}
            >
                {loading ? 'Loading...' : 'Change password'}
            </button>
        </div>
    )
}
