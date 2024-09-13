'use client'
import { BarChart4, MonitorPlay } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = () => {
    const pathname = usePathname()
    const sideBarRoutes = [
        { icon: <MonitorPlay />, label: "Courses", path: "/instructor/courses" },
        { icon: <BarChart4 />, label: "Performance", path: "/instructor/performance" }
    ]

    return (
        <div className="max-sm:hidden flex flex-col w-64 border-r shadow-md px-3 my-4 gap-4 text-sm font-medium mb-0">
            {sideBarRoutes.map(route => {
                return (
                    <Link
                        className={`flex items-center gap-4 p-3 rounded-lg hover:bg-black hover:text-white transition-all
                            ${pathname.startsWith(route.path) && "bg-black text-white transition-all"}
                            `}
                        href={route.path}
                        key={route.path}
                    >
                        {route.icon}{route.label}
                    </Link>
                )
            })}
        </div>
    )
}

export default Sidebar