import React, { useState } from "react";
import TextField from "./TextField"
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

export default function ChangePasswordForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);  // Loading state

    const session = Cookies.get('session');

    async function handleSubmit() {
        setLoading(true)

        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_HOST + '/auth/respondToAuthChallenge', {
                challengeName: 'NEW_PASSWORD_REQUIRED',
                challengeResponses: {
                    USERNAME: email, // assuming `email` is in scope
                    NEW_PASSWORD: newPassword,
                },
                session,
            });

            if (response.data.challengeName && response.data.challengeName === 'MFA_SETUP') {
                // MFA is required to complete sign in
                // override session cookie with new session
                Cookies.set('session', response.data.session);
            }

            // Login again with the new password
            const signInResponse = await axios.post(process.env.REACT_APP_BACKEND_HOST + '/login', {
                email,
                password: newPassword,
            });

            if (signInResponse.data.error) {
                setError("Your email or password is incorrect.")
            } else {
                navigate('/')
            }

        } catch (error) {
            setError(error.message || 'Something went wrong.');
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
