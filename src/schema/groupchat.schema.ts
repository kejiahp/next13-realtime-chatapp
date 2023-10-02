import * as z from "zod";

export const create_groupchat_validator = z.object({
  groupName: z
    .string({ required_error: "group name is required" })
    .nonempty("group name is required"),
  users: z
    .array(
      z.object({
        label: z
          .string({ required_error: "users label is required" })
          .nonempty("users is required"),
        value: z
          .string({ required_error: "users value is required" })
          .nonempty("users is required"),
      })
    )
    .min(2, "must contain at least 2 member(s)"),
});

export type CreateGroupChatValidatorType = z.infer<
  typeof create_groupchat_validator
>;
