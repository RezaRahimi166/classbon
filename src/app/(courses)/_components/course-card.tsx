import { CourseSummary } from "@/types/course-summary.interface";
import Image from "next/image";
import Link from "next/link";

export type CourseTypeProps = CourseSummary & {};

export const CourseCard: React.FC<CourseTypeProps> = ({
  coverImageId,
  title,
  subTitle,
  level,
  recordStatus,
  basePrice,
  duration,
  slug,
}: CourseTypeProps) => {
  return (
    <div className="card ">
      <figure>
        <Image
          src={`https://api.classbon.com/api/picture/${coverImageId}`}
          alt={title}
          width={550}
          height={327}
        />
      </figure>
      <div className="mt-2 flex gap-2 font-semibold dark:text-info px-3 py-2">
        {recordStatus}
        {level}
      </div>
      <div className="card-body">
        <Link href={`/course/${slug}`}>{title}</Link>
        <p>{subTitle}</p>
        <div>
          {duration} {basePrice}
        </div>
      </div>
      <Link href={`/course/${slug}`} className="card-footer justify-center">
        مشاهده ی جزئیات دوره
      </Link>
    </div>
  );
};
