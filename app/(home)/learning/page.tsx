import { getCoursePurchaseForStudent } from "@/app/actions/purchases";
import CourseCard from "@/components/courses/CourseCard";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const LearningPage = async () => {
    const session = await getSession();
    if (!session || !session.user) {
        return redirect("/sign-in")
    }

    const purchaseCourses = await getCoursePurchaseForStudent(session);
    return (
        <div className="px-4 py-6 md:mt-5 md:px-10 xl:px-16">
            <h1 className="text-2xl font-bold">
                Your courses
            </h1>
            <div className="flex flex-wrap gap-7 mt-7">
                {purchaseCourses && purchaseCourses.map(purchase => (
                    <CourseCard key={purchase.course.id} course={purchase.course} />
                ))}
            </div>
        </div>
    )
}
export default LearningPage