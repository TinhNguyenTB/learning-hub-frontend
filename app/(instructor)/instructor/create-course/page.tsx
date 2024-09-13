import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateCourseForm from "@/components/courses/CreateCourseForm"
import { sendRequest } from "@/lib/api"
import { getServerSession } from "next-auth";

const CreateCoursePage = async () => {
    let categories;

    const res = await sendRequest<IBackendRes<ICategory<ISubcategory[]>[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`,
        method: 'GET',
    })
    if (res?.data) {
        categories = res.data
    }

    const session = await getServerSession(authOptions)

    return (
        <>
            {categories && session &&
                <CreateCourseForm
                    session={session}
                    categories={categories.map(category => ({
                        label: category.name,
                        value: category.id,
                        subCategories: category.subCategories.map(subCategory => ({
                            label: subCategory.name,
                            value: subCategory.id,
                        }))
                    }))}
                />
            }
        </>
    )
}

export default CreateCoursePage