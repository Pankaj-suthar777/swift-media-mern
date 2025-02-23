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
  github: yup
    .string()
    .trim()
    .test(
      "is-optional-url",
      'GitHub URL must start with "https://github.com/"',
      (value) =>
        value === "" ||
        value === undefined ||
        value === null ||
        /^https:\/\/github\.com\//.test(value)
    )
    .optional(),
  twitter: yup
    .string()
    .trim()
    .test(
      "is-optional-url",
      'Twitter URL must start with "https://x.com/"',
      (value) =>
        value === "" ||
        value === undefined ||
        value === null ||
        /^https:\/\/x\.com\//.test(value)
    )
    .optional(),
  about: yup.string().trim().min(3, "About is too short!").optional(),
  avatar: yup.string().optional(),
  backgroundImage: yup.string().optional(),
});

export const CreatePostSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(3, "title is too short!")
    .max(70, "title is to long!"),
  image: yup.string().trim().optional(),
  visibility: yup.string().trim(),
});

export const UpdatePostSchema = yup.object().shape({
  title: yup.string().trim().optional(),
  image: yup.string().trim().optional(),
  visibility: yup.string().trim().optional(),
});

export const UpVoteDownVoteSchema = yup.object().shape({
  vote: yup
    .string()
    .trim()
    .min(3, "vote is required!")
    .equals(["up-vote", "down-vote"]),
});

export const AddCommentSchema = yup.object().shape({
  text: yup.string().trim().min(1, "text is required!"),
});

export const AddReplayToReplayCommentSchema = yup.object().shape({
  text: yup.string().trim().min(1, "text is required!"),
  replayToAuthorId: yup.number().min(1, "replay to author id is required!"),
  replayToCommentId: yup.number().min(1, "replay to author id is required!"),
});

export const CreateGroupSchema = yup.object().shape({
  title: yup.string().trim().min(1, "text is required!"),
  users: yup.array(),
  avatar: yup.string().optional(),
});

export const UpdateGroupSchema = yup.object().shape({
  title: yup.string().optional(),
  users: yup.array().optional(),
  avatar: yup.string().optional(),
});

export const UpdatePasswordSchema = yup.object().shape({
  newPassword: yup.string(),
  oldPassword: yup.string(),
});
