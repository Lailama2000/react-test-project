import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GET_ALL_USERS_KEY = "get-all-users";
export const getUsers = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response;
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: [GET_ALL_USERS_KEY],
    queryFn: () => getUsers(),
    refetchOnWindowFocus: false,
  });
};
