import { object, ref, string,number } from "yup";

export const registerSchema = object({
  firstName : string().required(),
  lastName : string().required(),
  email: string().email("email invalid").required("Email is  required"),
  password: string().min(6, "Password ต้องมากกว่า 6"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "confirm password invalid"
  ),
  phone :string().min(10).required(),
  address : string().required(),
});


export const loginSchema = object({
  email: string().email("email invalid").required("Email invalid"),
  password: string().min(6, "password invalid"),
  
});


export const postSchema = object({
  detail: string().required('กรอกรายละเอียด'),
  landtype: string().oneOf(['HOME', 'LAND']).required(),
  area: string().required(),
  location: string().required(),
  price: number().required().typeError('ต้องเป็นตัวเลข'),
})