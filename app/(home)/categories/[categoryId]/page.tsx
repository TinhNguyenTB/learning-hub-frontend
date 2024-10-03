import getCategories from "@/app/actions/categories/getCategories"
import getCoursesByCategory from "@/app/actions/courses/getCourseByCategory"
import CourseCard from "@/components/courses/CourseCard"
import Categories from "@/components/custom/Categories"
import DynamicPagination from "@/components/custom/DynamicPagination"

const CoursesByCategory = async ({
    params,
    searchParams
}: {
    params: { categoryId: string }
    searchParams: { [key: string]: string | undefined }
}) => {

    const { current, pageSize } = searchParams;
    const categories = await getCategories();

    let courses, total, pages;
    const res = await getCoursesByCategory(params.categoryId, current, pageSize);
    if (res) {
        courses = res.courses
        total = res.total
        pages = res.pages
    }

    return (
        <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
            <Categories categories={categories} selectedCategory={params.categoryId} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {courses && courses.map(course => {
                    return (
                        <CourseCard key={course.id} course={course} />
                    )
                })}
            </div>
            <DynamicPagination
                startUrl={`/categories/${params.categoryId}`}
                current={+current!}
                pageSize={+pageSize!}
                pages={pages!}
            />
        </div>
    )
}
export default CoursesByCategory