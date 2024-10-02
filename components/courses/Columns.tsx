"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Copy, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const getBadgeVariant = (statusName: string) => {
    switch (statusName) {
        case "PENDING":
            return "info";
        case "APPROVED":
            return "success";
        case "REJECTED":
            return "destructive";
        default:
            return "default";
    }
};

export const columns: ColumnDef<ICourse>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <div>{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button className="pl-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = formatCurrency(price)
            return <div>{formatted}</div>
        },
    },
    {
        accessorKey: "isPublished",
        header: "Visibility",
        cell: ({ row }) => {
            const isPublished = row.getValue("isPublished") || false;
            return (
                <Badge variant={isPublished ? 'default' : 'destructive'}>
                    {isPublished ? 'Published' : 'Private'}
                </Badge>
            )
        }
    },
    {
        accessorKey: "statusName",
        header: "Status",
        cell: ({ row }) => (
            <Badge
                className="capitalize"
                variant={getBadgeVariant(row.original.statusName)}
            >
                {row.getValue("statusName")}
            </Badge>
        ),
    },
    {
        id: 'actions',
        header: "Actions",
        cell: ({ row }) => {
            const course = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(course.title)}
                        >
                            <div className="flex gap-2 items-center">
                                <Copy className="h-4 w-4" />
                                <span>Copy title</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`/instructor/courses/${course.id}`}
                                className="flex gap-2 items-center"
                            >
                                <Pencil className="h-4 w-4" />
                                <span>Edit</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]