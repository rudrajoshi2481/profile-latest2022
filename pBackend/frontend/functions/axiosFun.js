import Axios from "axios";

const server = "http://localhost:5000";

export const createUser = async (payload) => {
  return await Axios.post(`${server}/auth/createuser`, payload);
};

export const LoginUser = async (payload) => {
  return await Axios.post(`${server}/auth/loginuser`, payload);
};

export const getProfileData = async (payload) => {
  return await Axios.post(`${server}/auth/loginuser`, payload);
};
