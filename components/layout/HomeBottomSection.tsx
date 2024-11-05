import { Award, BookOpen, Users } from "lucide-react"

const HomeBottomSection = () => {
    return (
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Learning Hub?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <BookOpen className="h-16 w-16 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Diverse Course Catalog</h3>
                        <p className="text-gray-600">Explore a wide range of courses across various disciplines.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Users className="h-16 w-16 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                        <p className="text-gray-600">Learn from industry professionals and experienced educators.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Award className="h-16 w-16 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Recognized Certifications</h3>
                        <p className="text-gray-600">Earn certificates to showcase your newly acquired skills.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeBottomSection