import React from "react";

const BlogDetails = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return (
    <div className="text-5xl flex justify-center items-center">
      <h1>{slug}</h1>
    </div>
  );
};

export default BlogDetails;
