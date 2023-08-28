import * as z from "zod";
import { imageValidator } from "./zod-resuables";

export const register_user_validator = z.object({
  username: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
  profilePhoto: imageValidator,
});

export type RegisterUserValidatorType = z.infer<typeof register_user_validator>;
