'use client'

import { getSession, Session } from "@/lib/session"
import { Menu, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import UserButton from "@/components/auth/UserButton"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
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

    return (
        <div className="flex justify-between items-center p-4 shadow">
            <Link href={"/"} className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">LearningHub</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
                <Link href="#" className="text-gray-600 hover:text-primary">Courses</Link>
                <Link href="#" className="text-gray-600 hover:text-primary">About</Link>
                <Link href="#" className="text-gray-600 hover:text-primary">Contact</Link>
            </nav>

            {session?.user ?
                <div className="flex gap-6 items-center">
                    <div className="max-sm:hidden flex gap-6">
                        {topRoutes.map(route => {
                            return (
                                <Link className="text-sm font-medium text-gray-600 hover:text-primary"
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
                                            <Link className="text-sm font-medium text-gray-600 hover:text-primary"
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
                                                    <Link className="text-sm font-medium text-gray-600 hover:text-primary"
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
                    <UserButton user={session.user} />
                </div>
                :
                <div className="flex items-center gap-2">
                    <Link href={"/sign-up"}>
                        <Button variant={"outline"}>Sign Up</Button>
                    </Link>
                    <Link href={"/sign-in"}>
                        <Button>Sign In</Button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default TopBar