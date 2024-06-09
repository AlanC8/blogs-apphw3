import Link from "next/link";
import React from "react";

export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface Blog {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
}



interface BlogItemProps {
  blog: Blog;
}

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
  return (
    <Link href={`/blog/${blog.id}`}>
      <div className="flex bg-white p-6">
        <div className="flex">
          <div className="flex flex-col ml-6 mr-6">
            <div className="flex items-center text-sm text-gray-500">
              <span>{blog.tags.join(", ")}</span>
              <span className="font-medium text-gray-700 mx-1">
                {blog.title}
              </span>
              <span>·</span>
              <time dateTime="2023-07-07" className="mx-1">
                7 July
              </time>
            </div>
            <h2 className="mt-2 text-2xl font-bold">{blog.title}</h2>
            <p className="mt-4 text-gray-600">{blog.body}</p>
            <div className="flex items-center mt-4">
              <h1>{blog.tags[0]}</h1>
              <span className="text-sm text-gray-500 ml-2">
                {blog.views} views
              </span>
              <span className="bg-gray-200 text-xs font-semibold text-gray-700 px-2 py-1 rounded ml-2">
                {blog.reactions.likes} likes
              </span>
              <span className="bg-gray-200 text-xs font-semibold text-gray-700 px-2 py-1 rounded ml-2">
                {blog.reactions.dislikes} dislikes
              </span>
            </div>
          </div>
          <div className="flex mt-4 ml-20">
            <img
              src="./favicon.ico"
              alt="Article illustration"
              className="rounded-lg w-[150px]"
            />
          </div>
        </div>
      </div>
      <hr />
    </Link>
  );
};

export default BlogItem;
