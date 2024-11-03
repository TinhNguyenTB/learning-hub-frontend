'use client'

import { getSession, Session } from "@/lib/session"
import { SearchIcon, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import UserButton from "@/components/auth/UserButton"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const TopBar = () => {
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };
        fetchSession();
    }, []);

    const pathName = usePathname();

    const topRoutes = [
        { label: "Instructor", path: "/instructor/courses" },
        { label: "Learning", path: "/learning" }
    ]

    const sideBarRoutes = [
        { label: "Courses", path: "/instructor/courses" },
        { label: "Performance", path: "/instructor/performance" }
    ]

    const router = useRouter();
    const [searchInput, setSearchInput] = useState<string>("");
    const handleSearch = () => {
        if (searchInput.trim() !== "") {
            router.push(`/search?query=${searchInput}&current=1&pageSize=8`)
        }
        setSearchInput("")
    }

    return (
        <div className="flex justify-between items-center p-4 shadow">
            <Link href={"/"}>
                <Image src={'/logo.png'} width={150} height={100} alt="logo" priority />
            </Link>
            <div className="max-md:hidden w-[400px] rounded-full flex ">
                <input className="flex-grow bg-[#F5F5F5] rounded-l-full border-none outline-none text-sm pl-4 py-3"
                    placeholder="Search for courses"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            handleSearch();
                    }}
                />
                <button className="bg-black/80 rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-black"
                    disabled={searchInput.trim() === ""}
                    onClick={() => handleSearch()}
                >
                    <SearchIcon className="h-4 w-4 text-white" />
                </button>
            </div>
            <div className="flex gap-6 items-center">
                <div className="max-sm:hidden flex gap-6">
                    {topRoutes.map(route => {
                        return (
                            <Link className="text-sm font-medium text-black/70 hover:text-black"
                                href={route.path} key={route.path}>
                                {route.label}
                            </Link>
                        )
                    })}
                </div>
                {/* mobile menu */}
                <div className="w-full max-w-[200px] z-20 sm:hidden">
                    <Sheet>
                        <SheetTrigger><Menu className="w-5 h-5" /></SheetTrigger>
                        <SheetContent className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                {topRoutes.map(route => {
                                    return (
                                        <Link className="text-sm font-medium hover:text-[#FDAB04]"
                                            href={route.path}
                                            key={route.path}>
                                            {route.label}
                                        </Link>
                                    )
                                })}
                            </div>
                            {pathName.startsWith("/instructor") &&
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-4">
                                        {sideBarRoutes.map(route => {
                                            return (
                                                <Link className="text-sm font-medium hover:text-[#FDAB04]"
                                                    href={route.path}
                                                    key={route.path}>
                                                    {route.label}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            }
                        </SheetContent>
                    </Sheet>
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