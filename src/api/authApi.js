import axios from "axios"
import useAuthStore from "../store/authStore";

axios.interceptors.request.use(function (config) {
    const token = useAuthStore.getState().token;
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
  const res = await axios.post('http://localhost:8787/user/post',value,)
  return res
}

export const getAllProduct = async() => {
  const res = await axios.get('http://localhost:8787/api/post')
  return res
}

export const getPropertyId = async(id) => {
  const res = await axios.get(`http://localhost:8787/api/property/${id}`)
  return res
}