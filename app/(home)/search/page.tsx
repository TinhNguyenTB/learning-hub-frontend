import getCoursesBySearch from "@/app/actions/courses/getCoursesBySearch";
import CourseCard from "@/components/courses/CourseCard";
import DynamicPagination from "@/components/custom/DynamicPagination";

const SearchPage = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | undefined }
}) => {

    const queryText = searchParams.query || "";
    const { current, pageSize } = searchParams;
    let courses, total, pages;
    const res = await getCoursesBySearch(queryText, current, pageSize);
    if (res) {
        courses = res.courses
        total = res.total
        pages = res.pages
    }

    return (
        <div className="px-4 py-6 md:px-10 xl:px-16">
            <p className="text-lg md:text-2xl font-semibold mb-10">
                Recommended courses for "{queryText}"
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {courses && courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
            {courses && courses.length ?
                <DynamicPagination
                    startUrl={`/search`}
                    current={+current!}
                    pageSize={+pageSize!}
                    pages={pages!}
                />
                :
                <h1 className="text-center mt-8 text-xl">No results</h1>
            }
        </div>
    )
}
export default SearchPage