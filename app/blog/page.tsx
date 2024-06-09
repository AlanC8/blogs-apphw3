"use client";

import React, { useEffect, useState } from "react";
import { Services } from "../components/services/services";
import BlogItem, { Blog } from "../components/BlogItem";
import MyModal from "../components/UI/modal/MyModal";

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [blog, setBlog] = useState<Partial<Blog>>({
    tags: [],
    reactions: {
      likes: 0,
      dislikes: 0,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBlog(blog);
    setVisible(false);
  };

  const addBlog = async (blog: Partial<Blog>) => {
    try {
      const defaultBlog: Blog = {
        id: blogs.length ? blogs[blogs.length - 1].id + 1 : 1,
        title: "Default Title",
        body: "Default body text...",
        tags: ["Default", "Tags"],
        reactions: {
          likes: 0,
          dislikes: 0,
        },
        views: 0,
        userId: 0,
      };

      const newBlog: Blog = {
        ...defaultBlog,
        ...blog,
        reactions: {
          ...defaultBlog.reactions,
          ...blog.reactions,
        },
      };

      const response = await Services.postBlog(newBlog);
      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
    } catch (error) {
      console.log("Error adding blog:", error);
    }
  };

  const getAllBlogs = async () => {
    try {
        const response = await Services.getAuthBlogs();
        setBlogs(response.data?.posts);
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
};


  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      {loading ? (
        <h1 className="text-center text-5xl py-10 bg-white">Загрузка...</h1>
      ) : (
        <div>
          {blogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
          <div className="text-center text-3xl py-5">
            <button
              className="border-2 px-5 py-3 rounded"
              onClick={() => setVisible(true)}
            >
              Add Blog
            </button>
            <MyModal visible={visible} setVisible={setVisible}>
              <form onSubmit={handleSubmit}>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={blog.title || ""}
                  onChange={handleChange}
                  required
                  placeholder="Название поста"
                  className="block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <input
                  id="body"
                  name="body"
                  type="text"
                  value={blog.body || ""}
                  onChange={handleChange}
                  placeholder="Описание поста"
                  required
                  className="block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button type="submit">Submit</button>
              </form>
            </MyModal>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPage;
