import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditCourseForm from "@/components/courses/EditCourseForm"
import { sendRequest } from "@/lib/api";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const CourseBasics = async ({ params }: { params: { courseId: string } }) => {
    const session = await getServerSession(authOptions);
    let categories;
    let course;
    let levels;

    const resCategories = await sendRequest<IBackendRes<ICategory<ISubcategory[]>[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`,
        method: 'GET',
    })
    if (resCategories?.data) {
        categories = resCategories.data
    }

    const resLevels = await sendRequest<IBackendRes<ILevel[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/levels`,
        method: 'GET',
    })
    if (resLevels?.data) {
        levels = resLevels.data
    }

    const resCourse = await sendRequest<IBackendRes<ICourse>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${params.courseId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.access_token}`
        }
    })
    if (resCourse?.data) {
        course = resCourse.data
    }

    if (!course) {
        return redirect('/instructor/courses');
    }

    return (
        <div className="px-10">
            {course && categories && levels && session &&
                <EditCourseForm
                    session={session}
                    course={course}
                    categories={categories?.map(category => ({
                        label: category.name,
                        value: category.id,
                        subCategories: category.subCategories.map(subCategory => ({
                            label: subCategory.name,
                            value: subCategory.id,
                        }))
                    }))}
                    levels={levels.map(level => ({
                        label: level.name,
                        value: level.id
                    }))}
                />
            }
        </div>
    )
}

export default CourseBasics