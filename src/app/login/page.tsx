'use client'
import TextField from "@/components/TextField"
import LoginForm from "@/components/LoginForm"
import Image from "next/image";
import Link from "next/link";


export default function Login() {

    async function handleSubmit() {
        console.log('submit')
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#603BB0]">
            <div className="w-full max-w-sm p-6 bg-white rounded-3xl shadow">
                <div className="flex items-center justify-center">
                <Image src="/images/cs-loginSoyMomoImage.svg" width={100} height={100} className="mt-[-12vh]" alt="momoImage"/>
                </div>


                <h1 className="text-2xl font-bold text-center text-[#603BB0]">Log in</h1>
                


                <LoginForm/>
                <Link href="/">
                    <h3 className="mt-5 text-xs text-center text-[#603BB0] hover:underline">¿Olvidaste tu contraseña?</h3>
                </Link>
                <Image src="/images/cs-loginSoyMomoLogo.svg" width={100} height={100} className="absolute top-0 right-0 w-50 h-50 mt-4 mr-10" alt="logo"/>
            </div>
        </div>
    )
}
