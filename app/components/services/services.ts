import axios from "axios";
import { Blog } from "../BlogItem";
import axiosInstances from "./axios";

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

export class Services {
  static async getBlogs() {
    const response = await axios.get<Blog[]>(
      "https://dummyjson.com/posts?limit=10"
    );
    return response;
  }

  static async getAuthBlogs() {
    const response = await axiosInstances.get<Blog[]>("/auth/posts");
    return response;
  }

  static async getBlogById(id: number) {
    const response = await axios.get<Blog>(
      `https://dummyjson.com/posts/${id}`
    );
    return response;
  }

  static async loginUser(username: string, password: string) {
    const response = await axios.post<User>(
      "https://dummyjson.com/auth/login",
      {
        username,
        password,
        expiresInMins: 30,
      }
    );
    return response;
  }

  static async getUser() {
    try {
      const response = await axiosInstances.get<User>("/auth/me");
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  static async postBlog(blog: Blog) {
    const { title, body } = blog;
    try {
      const response = await axiosInstances.post<Blog>("/posts/add", {
        title,
        body,
        userId: 21,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateBlog(title: string, body: string, id: number) {
    try {
      const response = await axiosInstances.put<Blog>(`/posts/${id}`, {
        title: title,
        body: body,
      });
      return "updated";
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteBlog(id: number) {
    try {
      const response = await axiosInstances.delete<Blog>(`/posts/${id}`);
      if (response.status === 200) {
        return "deleted";
      }
    } catch (error) {
      console.error(error);
    }
  }
}
