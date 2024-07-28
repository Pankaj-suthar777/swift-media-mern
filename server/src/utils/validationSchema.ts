import * as yup from "yup";

export const CreateUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing")
    .min(3, "Name is too short!")
    .max(20, "Name is to long!"),
  email: yup.string().required("Email is missing!").email("Invalid email id!"),
  password: yup
    .string()
    .trim()
    .required("Password is missing!")
    .min(5, "password is too short!"),
});

export const SignInValidationSchema = yup.object().shape({
  email: yup.string().required("Email is missing!").email("Invalid email id!"),
  password: yup.string().trim().required("Password is missing!"),
});

export const UpdateUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, "Name is too short!")
    .max(20, "Name is to long!")
    .optional(),
  about: yup.string().trim().min(3, "About is too short!").optional(),
  avatar: yup.string().optional(),
});

export const CreatePostSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(3, "title is too short!")
    .max(70, "title is to long!"),
  image: yup.string().trim().optional(),
});
