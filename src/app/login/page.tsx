import TextField from "@/components/TextField"

export default function Login() {
    return (
        <div className="flex">
            <div className="flex flex-col items-center justify-center bg-white rounded-3xl mr-4 w-full h-[calc(100vh-2rem)] my-4">
                <h1 className="text-6xl font-bold text-black">
                    Login
                </h1>
                <div className="flex flex-col items-center justify-center">
                    <TextField label="Email" />
                    <TextField label="Senha" />
                </div>
            </div>
        </div>
    )
}
