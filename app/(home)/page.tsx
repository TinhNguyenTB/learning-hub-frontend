import getCoursesByCategory from "@/app/actions/courses/getCourseByCategory";
import Categories from "@/components/custom/Categories";
import CourseCard from "@/components/courses/CourseCard";
import getCategories from "@/app/actions/categories/getCategories";


export default async function Home() {
  const categories = await getCategories();
  let courses;
  const res = await getCoursesByCategory(null); // fetch all courses
  if (res) {
    courses = res.courses
  }

  return (
    <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
      <Categories categories={categories} selectedCategory={null} />
      <div className="flex flex-wrap gap-7 justify-center">
        {courses && courses.map(course => {
          return (
            <CourseCard key={course.id} course={course} />
          )
        })}
      </div>
    </div>
  );
}