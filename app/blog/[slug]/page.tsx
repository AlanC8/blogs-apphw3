"use client";

import React, { useEffect, useState } from "react";
import { Services } from "../../components/services/services";
import { Blog } from "../../components/BlogItem";
import Link from "next/link";
import { setDefaultHighWaterMark } from "stream";
import { useRouter } from "next/navigation";
import MyModal from "@/app/components/UI/modal/MyModal";
interface BlogIdPageProps {
  params: {
    slug: string;
  };
}
const BlogIdPage: React.FC<BlogIdPageProps> = ({ params: { slug } }) => {
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const deleteClick = async () => {
    try {
      const res = await Services.deleteBlog(+slug);
      if (res === "deleted") {
        router.push("/blog");
      }
      alert("post deleted!");
    } catch (error) {
      console.log(error);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newBody, setNewBody] = useState<string>("");
  const [updated, setUpdated] = useState(false);
  const openModal = () => {
    setIsModalVisible(true);
    setNewTitle(blog?.title || "");
    setNewBody(blog?.body || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await Services.updateBlog(newTitle, newBody, +slug);
      if (res === "updated") {
        setIsModalVisible(false);
        setNewTitle("");
        setNewBody("");
        getId();
        setUpdated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getId = async () => {
    const response = await Services.getBlogById(+slug);
    if (response !== undefined) {
      setBlog(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getId();
  }, []);

  if (loading) {
    return (
      <h1 className="bg-white text-3xl text-center py-[240px]">
        ЗаГрУзКа... Ат Бога
      </h1>
    );
  }

  return (
    <div className="bg-white">
      <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
        <article className="prose prose-gray max-w-3xl mx-auto dark:prose-invert">
          <div className="flex justify-between">
            <Link href={`/blog`}>
              <div className="mb-10 opacity-40 text-sm">
                ← Вернуться обратно
              </div>
            </Link>
            <div className="flex space">
              <div
                onClick={openModal}
                className="mb-10 opacity-40 text-xl cursor-pointer"
              >
                ✎
              </div>
              <MyModal visible={isModalVisible} setVisible={setIsModalVisible}>
                <form onSubmit={handleSubmit}>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    placeholder="Название поста"
                    className="block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <input
                    id="body"
                    name="body"
                    type="text"
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    required
                    placeholder="Описание поста"
                    className="block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button type="submit">Submit</button>
                </form>
              </MyModal>

              <div
                onClick={() => deleteClick()}
                className="mb-10 opacity-40 text-xl ml-3 cursor-pointer"
              >
                ✕
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <p className="text-gray-500 dark:text-gray-400">User User</p>
            </div>
            <div className="flex">
              {blog?.tags.map((tag) => (
                <p key={tag} className="text-gray-500 dark:text-gray-400 mr-2">
                  {tag}
                </p>
              ))}
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 lg:text-5xl">
            {updated ? newTitle : blog?.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">
            {updated ? newBody : blog?.body}
          </p>
          <p>
            Through practical tips and real-world examples, you'll learn how to
            harness the power of storytelling to connect with your audience,
            convey your message, and leave a lasting impact.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
            reiciendis sed rem sunt dignissimos enim laudantium nesciunt earum,
            ducimus repudiandae magnam natus inventore voluptatibus quod optio,
            illo, amet adipisci maiores ex quasi aliquid delectus eum. Quisquam
            accusamus in, ex dicta, itaque eveniet minus veritatis cupiditate
            ipsam, perferendis rem ut consequuntur!
          </p>
        </article>
      </div>
    </div>
  );
};

export default BlogIdPage;
