import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    console.log(session);

    if (!session) {
        redirect('/login')
    } else {
      redirect('/dashboard')
    }
}
