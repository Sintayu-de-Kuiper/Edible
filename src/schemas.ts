import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  image: z
    .any() // Allow any type initially, we'll validate it manually
    .refine((file) => {
      return file instanceof File && file.type.startsWith("image/");
    }, "Only image files are allowed"),
});
