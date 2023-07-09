import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }
    return (
        <div className="flex">
            <div className="flex flex-col items-center justify-center bg-white rounded-3xl mr-4 w-full h-[calc(100vh-2rem)] my-4">
                <h1 className="text-6xl font-bold text-black text-center">
                    Dashboard, Hello {session?.user?.email}
                </h1>
            </div>
        </div>
    )
}
