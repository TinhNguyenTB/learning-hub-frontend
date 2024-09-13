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

const UserButton = ({ user }: { user: IUser }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage
                        src={user.accountType !== process.env.NEXT_PUBLIC_ACCOUNT_DEFAULT
                            ? user.image : ``}
                    />
                    <AvatarFallback className="uppercase font-bold bg-black text-white">
                        {user.name.slice(0, 1)}
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
                <DropdownMenuItem className="flex items-center gap-2">
                    <RiLockPasswordFill className="h-5 w-5" />
                    <p>Change password</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="flex items-center gap-2">
                    <FaSignOutAlt className="h-5 w-5" />
                    <p>Sign out</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton