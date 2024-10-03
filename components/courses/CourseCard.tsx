import { Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import getLevelById from "@/app/actions/levels/getLevelById";
import getUserById from "@/app/actions/users/getUserById";
import Ratings from "../custom/Rating";

interface CourseCardProps {
    course: ICourse
}
const CourseCard = async ({ course }: CourseCardProps) => {

    const level = await getLevelById(course.levelId)
    const instructor = await getUserById(course.instructorId)

    return (
        <Link href={`/courses/${course.id}/overview`} className="border rounded-lg cursor-pointer">
            <Image src={course.imageUrl ?? "/image_placeholder.webp"} alt={course.title}
                width={500}
                height={300}
                className="rounded-t-lg w-full h-[180px] object-cover"
            />
            <div className="px-4 py-3 flex flex-col gap-2">
                <span className="text-lg font-semibold">{course.title}</span>
                <div className="text-sm font-medium">
                    {instructor &&
                        <div className="flex gap-2 items-center">
                            <Avatar>
                                <AvatarImage
                                    src={instructor.accountType !== process.env.NEXT_PUBLIC_ACCOUNT_DEFAULT
                                        ? instructor.image : ``}
                                />
                                <AvatarFallback className="uppercase font-bold bg-black text-white">
                                    {instructor?.name?.slice(0, 1)}
                                </AvatarFallback>
                            </Avatar>
                            <p>{instructor.name}</p>
                        </div>
                    }
                </div>
                <Ratings rating={course.averageRating!} variant="yellow" />
                <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">$ {course.price}</p>
                    {level &&
                        <div className="flex gap-1 items-center">
                            <Gem size={20} />
                            <p>{level.name}</p>
                        </div>
                    }
                </div>
            </div>
        </Link>
    )
}
export default CourseCard