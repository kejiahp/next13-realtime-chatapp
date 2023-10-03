import * as z from "zod";

export const send_message_validator = z.object({
  content: z
    .string({ required_error: "provide a message" })
    .nonempty("provide a message")
    .trim(),
});

export type SendMessageValidatorType = z.infer<typeof send_message_validator>;
