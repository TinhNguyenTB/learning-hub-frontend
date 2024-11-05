"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const Banner = () => {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState<string>("");

    const handleSearch = () => {
        if (searchInput.trim() !== "") {
            router.push(`/search?query=${searchInput}&current=1&pageSize=8`)
        }
        setSearchInput("")
    }

    return (
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Unlock Your Potential with Online Learning</h1>
                    <p className="text-xl mb-8">Discover courses taught by industry experts and take your skills to the next level.</p>
                    <div className="flex space-x-4">
                        <Input placeholder="Search courses..." className="bg-white text-gray-900"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter")
                                    handleSearch();
                            }}
                        />
                        <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                            <Search className="mr-2 h-4 w-4" /> Search
                        </Button>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <Image
                        src="/banner.jpg?height=400&width=600"
                        alt="Online learning illustration"
                        width={600}
                        height={400}
                        priority
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>
    )
}

export default Banner