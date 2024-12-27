"use client";

import { useParams } from "next/navigation";
import { useCourseComments } from "../../_api/get-comments";
import { Comment } from "@/app/_components/comment/comment";

const CourseComments = () => {
  const { slug } = useParams();
  const { data: comments, isLoading } = useCourseComments({
    params: {
      slug: slug as string,
      page: 1,
    },
  });
  return (
    <>
      {comments?.data.map((comment) => (
        <Comment key={`comment-${comment.id}`} {...comment} variant={"info"} />
      ))}
    </>
  );
};

export default CourseComments;
