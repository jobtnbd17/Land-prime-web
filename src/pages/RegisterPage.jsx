import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/validate.js";
import { actionRegister } from "../api/authApi.js";
import FromInput from "../components/FromInput.jsx";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function RegisterPage() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState, reset } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { isSubmitting, errors } = formState;

  const hdlSubmit = async (value) => {
    //  await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const resp = await actionRegister(value);
        console.log(resp);
      toast.success("Register Success")
      navigate("/login");
      reset();
      

      
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message)
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-[#3E3C36] p-4">
      <div className="bg-[#1E1C1A] shadow-xl rounded-lg p-8 w-full max-w-md border border-[#5C5A52]">
        <h1 className="text-3xl font-bold text-center text-[#D2B48C] mb-6">
          Register
        </h1>
        <form onSubmit={handleSubmit(hdlSubmit)} className="space-y-4">
          <FromInput register={register} name="firstName" errors={errors} />
          <FromInput register={register} name="lastName" errors={errors} />
          <FromInput register={register} name="email" errors={errors} />
          <FromInput
            register={register}
            name="password"
            type="password"
            errors={errors}
          />
          <FromInput
            register={register}
            name="confirmPassword"
            type="password"
            errors={errors}
          />
          <FromInput register={register} name="phone" errors={errors} />
          <FromInput register={register} name="address" errors={errors} />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-lg font-semibold text-[#1E1C1A] transition duration-300 ${
              isSubmitting
                ? "bg-[#A67B5B] cursor-not-allowed"
                : "bg-[#D2B48C] hover:bg-[#C19A6B]"
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
