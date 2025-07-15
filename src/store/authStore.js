import { create } from "zustand";
import { actionLogin } from "../api/authApi";
import { persist } from "zustand/middleware";

const authStore = (set) => ({
  id : "",
  token: null,
  user: {},
  actionLoginWithZustand: async (value) => {
    try {
      const res = await actionLogin(value);
      const { accessToken } = res.data;
      console.log(res.data)
      set({id : res.data.id , token: accessToken, user: res.data.role });
      
      return { success: true, role: res.data.role };
    } catch (error) {
      console.log(error);
      return { success: false, message: error.response?.data?.message };
    }
  },
  actionLogout : async () => {
    set({token : null, user : "" })
  }
});

const useAuthStore = create(persist(authStore,{name : "auth-store"}))

export default useAuthStore