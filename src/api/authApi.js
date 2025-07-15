import axios from "axios"
import useAuthStore from "../store/authStore";

axios.interceptors.request.use(function (config) {
    const token = useAuthStore.getState().token;
    console.log("token",token)
    config.headers.Authorization = "Bearer " + token;
     
    return config;
});

export const actionRegister = async (value) => {
  const res = await axios.post('http://localhost:8787/auth/register',value)
  return res.data
}

export const actionLogin = async (value) => {
  const res = await axios.post('http://localhost:8787/auth/login',value)
  return res
}
export const createPost = async (value) => {
  const res = await axios.post('http://localhost:8787/user/post',value)
  return res
}
