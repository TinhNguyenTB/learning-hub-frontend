import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import SignUpForm from "@/components/auth/SignUpForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const SignUpPage = async () => {
    const session = await getServerSession(authOptions)
    if (session) {
        return redirect('/')
    }

    return (
        <div className='flex items-center justify-center mt-auto mb-auto h-screen'>
            <SignUpForm />
        </div>
    )
}

export default SignUpPage