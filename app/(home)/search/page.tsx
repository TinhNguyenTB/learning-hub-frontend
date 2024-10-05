import getCourseBySearch from "@/app/actions/courses/getCourseBySearch";
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
    const res = await getCourseBySearch(queryText, current, pageSize);
    if (res) {
        courses = res.courses
        total = res.total
        pages = res.pages
    }

    return (
        <div className="px-4 py-6 md:px-10 xl:px-16">
            <p className="text-lg md:text-2xl font-semibold mb-10">
                Recommended courses for {queryText}
            </p>
            <div className="flex gap-4 flex-wrap">
                {courses && courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
            <DynamicPagination
                startUrl={`/search`}
                current={+current!}
                pageSize={+pageSize!}
                pages={pages!}
            />
        </div>
    )
}
export default SearchPage