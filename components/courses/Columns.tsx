"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<ICourse>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button className="pl-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)
            return <div>{formatted}</div>
        },
    },
    {
        accessorKey: "isPublished",
        header: ({ column }) => {
            return (
                <Button className="pl-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Visibility
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
        header: ({ column }) => {
            return (
                <Button className="pl-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: 'actions',
        header: "Actions",
        cell: ({ row }) => (
            <Link href={`/instructor/courses/${row.original.id}`}
                className="flex gap-2 items-center hover:text-[#FDAB04]"
            >
                <Pencil className="h-4 w-4" />Edit
            </Link>
        )
    }
]