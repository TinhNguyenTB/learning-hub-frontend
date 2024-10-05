"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface CategoriesProps {
    categories: ICategory[] | undefined
    selectedCategory: string | null
}

const Categories = ({ categories, selectedCategory }: CategoriesProps) => {
    const router = useRouter();
    const handleClick = (categoryId: string | null) => {
        router.push(categoryId ? `/categories/${categoryId}?current=1&pageSize=1` : '/')
    }

    return (
        <div className="flex flex-wrap px-4 gap-7 justify-center my-10">
            <Button variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => handleClick(null)}
            >
                All Categories
            </Button>
            {categories && categories.map(category => (
                <Button key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    onClick={() => handleClick(category.id)}
                >
                    {category.name}
                </Button>
            ))}
        </div>
    )
}
export default Categories