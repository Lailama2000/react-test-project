import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GET_ALL_POSTS_KEY = "get-all-posts";
export const getPosts = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response;
};

export const useGetPosts = () => {
  return useQuery({
    queryKey: [GET_ALL_POSTS_KEY],
    queryFn: () => getPosts(),
    refetchOnWindowFocus: false,
  });
};
