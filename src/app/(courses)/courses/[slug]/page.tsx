import { Progress } from "@/app/_components/progress";
import { Rating } from "@/app/_components/rating/rating";
import { API_URL } from "@/configs/global";
import { CourseDetails } from "@/types/course-details.interface";
import { CourseAside } from "./_components/course-aside/course-aside";

export async function generateStaticParams() {
  const slugs = await fetch(`${API_URL}/courses/slugs`).then((res) =>
    res.json()
  );

  return (slugs as string[]).map((slug) => ({
    slug: slug,
  }));
}

async function getCourse(slug: string): Promise<CourseDetails> {
  const res = await fetch(`${API_URL}/courses/${slug}`);
  return res.json();
}

export default async function CoursDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const course = await getCourse(slug);
  return (
    <div className="p-5 container grid grid-cols-10 grid-rows-[1fr 1fr] gap-10 py-10">
      <div className="bg-primary pointer-events-none absolute bottom-0 left-1/2 aspect-square w-1/2 -translate-x-1/2 rounded-full opacity-5 -top-52 blur-3xl"></div>
      <div className="col-span-10 xl:col-span-7">
        <h1 className="text-center xl:text-right text-2xl lg:text-3xl xl:text-4xl font-black leading-10">
          {course.title}
        </h1>
        <h2 className="mt-4 text-center xl:text-right text-lg  leading-9">
          {course.subTitle}
        </h2>

        <div className=" mt-5">Video Player Component</div>
      </div>
      <div className="col-span-10 xl:col-span-3">
        <CourseAside {...course} />
      </div>
      <div className="col-span-10 xl:col-span-6 bg-info"></div>
      <div className="col-span-10 xl:col-span-4 bg-warning"></div>
    </div>
  );
}
