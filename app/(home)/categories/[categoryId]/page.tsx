import getCategories from "@/app/actions/categories/getCategories"
import getCoursesByCategory from "@/app/actions/courses/getCourseByCategory"
import CourseCard from "@/components/courses/CourseCard"
import Categories from "@/components/custom/Categories"

const CoursesByCategory = async ({ params }: { params: { categoryId: string } }) => {
    const categories = await getCategories();
    let courses;
    const res = await getCoursesByCategory(params.categoryId);
    if (res) {
        courses = res.courses
    }

    return (
        <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
            <Categories categories={categories} selectedCategory={params.categoryId} />
            <div className="flex flex-wrap gap-7 justify-center">
                {courses && courses.map(course => {
                    return (
                        <CourseCard key={course.id} course={course} />
                    )
                })}
            </div>
        </div>
    )
}
export default CoursesByCategory