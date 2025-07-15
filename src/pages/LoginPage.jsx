import React from "react";
import FromInput from "../components/FromInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/validate";
import { actionLogin } from "../api/authApi";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate()

  const actionLoginWithZustand = useAuthStore((state) => state.actionLoginWithZustand)


  const {handleSubmit , register , formState,reset} = useForm({
    resolver : yupResolver(loginSchema),
  })
  const {isSubmitting , errors} = formState

  const hdlSubmit = async(value) => {
    const res = await actionLoginWithZustand(value)
    if(res.success){
      toast.success("Login success")
      navigate('/')
    }else{
      toast.error("Login fail")
    }
  }
 

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-[#3E3C36] p-4">
  <div className="bg-[#262421] shadow-2xl rounded-xl p-8 w-full max-w-md border border-[#5C5A52]">
    <h1 className="text-3xl font-bold text-center text-[#D2B48C] mb-8 tracking-wide">
      Login
    </h1>

    <form  onSubmit={handleSubmit(hdlSubmit)} className="space-y-5">
      <FromInput
        register={register}
        name="email"
        errors={errors}
      />
      <FromInput
        register={register}
        name="password"
        type="password"
        errors={errors}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 rounded-lg font-semibold text-[#1E1C1A] transition duration-300 cursor-pointer ${
          isSubmitting
            ? "bg-[#A67B5B] cursor-not-allowed"
            : "bg-[#D2B48C] hover:bg-[#C19A6B]"
        }`}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  </div>
</div>

  );
}

export default LoginPage;
