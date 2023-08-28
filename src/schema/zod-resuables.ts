import * as zod from "zod";

const MAX_FILE_SIZE_BYTES = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const urlValidator = zod.string().refine(
  (url) => {
    if (url.length > 1) {
      const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
      return valid;
    }
    return true;
  },
  { message: "downloadLink must be a url" }
);

export const imageValidator = zod
  .any()
  .refine(
    (files) => files?.[0]?.size <= MAX_FILE_SIZE_BYTES,
    `Max image size is 5MB.`
  )
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );

export const optionalImageValidator = zod
  .any()
  .refine((files) => {
    if (files instanceof FileList && typeof files !== "string") {
      const valid = files?.[0]?.size <= MAX_FILE_SIZE_BYTES;
      return valid;
    }
    return true;
  }, `Max image size is 5MB.`)
  .refine((files) => {
    if (files instanceof FileList && typeof files !== "string") {
      const valid = ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
      return valid;
    }
    return true;
  }, "Only .jpg, .jpeg, .png and .webp formats are supported.");
