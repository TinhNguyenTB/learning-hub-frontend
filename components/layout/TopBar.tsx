'use client'

import { useSession, signOut } from "next-auth/react"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import UserButton from "@/components/auth/UserButton"


const TopBar = () => {
    const { data: session } = useSession()
    const topRoutes = [
        { label: "Instructor", path: "instructor/courses" },
        { label: "Learning", path: "/learning" }
    ]

    return (
        <div className="flex justify-between items-center p-4">
            <Link href={"/"}>
                <Image src={'/logo.png'} width={150} height={100} alt="logo" />
            </Link>
            <div className="max-md:hidden w-[400px] rounded-full flex ">
                <input className="flex-grow bg-[#FFF7F7] rounded-l-full border-none outline-none text-sm pl-4 py-3"
                    placeholder="Search for courses"
                />
                <button className="bg-[#C68FE6] rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-[#C68FE6]/80">
                    <SearchIcon className="h-4 w-4 text-[#FFF7F7]" />
                </button>
            </div>
            <div className="flex gap-6 items-center">
                <div className="max-sm:hidden flex gap-6">
                    {topRoutes.map(route => {
                        return (
                            <Link className="text-sm font-medium hover:text-[#C68FE6]"
                                href={route.path} key={route.path}>
                                {route.label}
                            </Link>
                        )
                    })}
                </div>
                {session?.user ?
                    <UserButton user={session.user} />
                    :
                    <Link href={"/sign-in"}>
                        <Button>Sign In</Button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default TopBar