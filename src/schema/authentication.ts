import * as z from "zod";
import { imageValidator } from "./zod-resuables";

export const register_user_validator = z.object({
  username: z
    .string({ required_error: "username is required" })
    .nonempty("username is required"),
  email: z
    .string({ required_error: "email is required" })
    .email()
    .nonempty("email is required"),
  password: z
    .string({ required_error: "password is required" })
    .nonempty("password is required"),
  profilePhoto: imageValidator,
});

export type RegisterUserValidatorType = z.infer<typeof register_user_validator>;
