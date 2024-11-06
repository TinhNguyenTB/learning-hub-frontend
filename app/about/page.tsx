import { Award, BookOpen, CheckCircle, Users } from "lucide-react"
import Image from "next/image"


const AboutPage = () => {
    return (
        <main className="flex-grow">
            <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">About Learning Hub</h1>
                    <p className="text-xl text-center max-w-3xl mx-auto">
                        Empowering learners worldwide with quality online education and innovative learning experiences.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                At LearnHub, our mission is to bridge the gap between education and technology,
                                providing accessible, high-quality learning experiences to students around the globe.
                                We believe in the power of knowledge to transform lives and shape the future.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Deliver world-class education to all",
                                    "Foster a community of lifelong learners",
                                    "Innovate in online learning methodologies",
                                    "Empower individuals to achieve their goals"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src="/banner.jpg?height=400&width=600&text=Our+Mission"
                                alt="Our Mission"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <BookOpen className="h-12 w-12 text-primary mb-4" />,
                                title: "Quality Education",
                                description: "We are committed to providing the highest standard of online education, curated by experts in their fields."
                            },
                            {
                                icon: <Users className="h-12 w-12 text-primary mb-4" />,
                                title: "Community-Driven",
                                description: "We foster a supportive learning community where students can collaborate, share insights, and grow together."
                            },
                            {
                                icon: <Award className="h-12 w-12 text-primary mb-4" />,
                                title: "Innovation",
                                description: "We continuously innovate our platform and teaching methodologies to enhance the learning experience."
                            }
                        ].map((value, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                                <div className="flex justify-center">{value.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Join Our Learning Community</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Become part of a global network of learners, educators, and innovators.
                        Start your learning journey with Learning Hub today and unlock your full potential.
                    </p>
                </div>
            </section>
        </main>

    )
}

export default AboutPage