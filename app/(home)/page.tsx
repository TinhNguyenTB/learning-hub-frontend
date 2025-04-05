import { getFeaturedCourses } from "@/app/actions/courses";
import CourseCard from "@/components/courses/CourseCard";

export default async function Home() {
  const featuredCourses = await getFeaturedCourses();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredCourses && featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}