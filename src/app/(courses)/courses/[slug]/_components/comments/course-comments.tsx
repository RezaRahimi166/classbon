"use client";

import { useParams } from "next/navigation";
import { useCourseComments } from "../../_api/get-comments";
import { Comment } from "@/app/_components/comment/comment";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { TextPlaceholder } from "@/app/_components/placeholders";

const CourseComments = () => {
  const { ref, inView } = useInView({});

  const { slug } = useParams();
  const {
    data: comments,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useCourseComments({
    params: {
      slug: slug as string,
      page: 1,
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      {comments?.pages.map((currentPage) => (
        <Fragment key={`comment-page-${currentPage}`}>
          {currentPage.data.map((comment) => (
            <Comment
              key={`comment-${comment.id}`}
              {...comment}
              variant={"info"}
            />
          ))}
        </Fragment>
      ))}

      {isFetchingNextPage ||
        (hasNextPage && (
          <div ref={ref}>
            <TextPlaceholder />
          </div>
        ))}
    </>
  );
};

export default CourseComments;
