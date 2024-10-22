'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IUser } from "@/types/next-auth"
import { signOut } from "next-auth/react"
import { FaAddressCard, FaSignOutAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link"
import { useState } from "react"

const UserButton = ({ user }: { user: IUser }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage
                        src={user?.image ?? ""}
                    />
                    <AvatarFallback className="uppercase font-bold bg-black text-white">
                        {user?.name?.slice(0, 1)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3">
                <DropdownMenuLabel>
                    {user.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                    <FaAddressCard className="h-5 w-5" />
                    <p>Profile</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={'/change-password'} className="flex items-center gap-2">
                        <RiLockPasswordFill className="h-5 w-5" />
                        <p>Change password</p>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="flex items-center gap-2">
                    <FaSignOutAlt className="h-5 w-5" />
                    <p>Sign out</p>
                    {/* <Link href={"/api/auth/signout"}>Sign out</Link> */}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton