const baseURL = "https://swift-rivals-mern.onrender.com/api";

import axios, { CreateAxiosDefaults } from "axios";

const client = axios.create({
  baseURL,
});

export default client;

type headers = CreateAxiosDefaults<any>["headers"];

export const getClient = async (headers?: headers) => {
  const token = await localStorage.getItem("accessToken");

  if (!token) return axios.create({ baseURL });

  const defaultHeaders = {
    Authorization: "Bearer " + token,
    ...headers,
  };

  return axios.create({ baseURL, headers: defaultHeaders });
};
