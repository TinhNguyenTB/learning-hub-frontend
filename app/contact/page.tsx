import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"


const ContactPage = () => {
    return (
        <main className="flex-grow">
            <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Contact Us</h1>
                    <p className="text-xl text-center max-w-3xl mx-auto">
                        Have questions or feedback? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                We value your input and are always eager to hear from our community.
                                Whether you have a question about our courses, need technical support,
                                or just want to share your thoughts, we're here to listen.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <p className="text-gray-600">support@learninghub.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
                                    <div>
                                        <h3 className="font-semibold">Phone</h3>
                                        <p className="text-gray-600">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                                    <div>
                                        <h3 className="font-semibold">Address</h3>
                                        <p className="text-gray-600">123 Learning Street, Education City, 12345</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <Input id="name" placeholder="Your name" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <Input id="email" type="email" placeholder="your@email.com" required />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <Input id="subject" placeholder="What is this regarding?" required />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <Textarea id="message" placeholder="Your message" rows={4} required />
                                </div>
                                <Button type="submit" className="w-full">Send Message</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                question: "How do I enroll in a course?",
                                answer: "To enroll in a course, simply navigate to the course page and click the 'Enroll' button. Follow the prompts to complete your registration and payment if required."
                            },
                            {
                                question: "What payment methods do you accept?",
                                answer: "We accept major credit cards, PayPal, and bank transfers for course payments. Specific payment options may vary depending on your location."
                            },
                            {
                                question: "Can I get a refund if I'm not satisfied with a course?",
                                answer: "Yes, we offer a 30-day money-back guarantee for most of our courses. Please review our refund policy for more details and eligibility criteria."
                            },
                            {
                                question: "How do I access my enrolled courses?",
                                answer: "Once enrolled, you can access your courses by logging into your LearnHub account and navigating to the 'My Courses' section in your dashboard."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="text-left">
                                <h3 className="font-semibold mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>

    )
}

export default ContactPage