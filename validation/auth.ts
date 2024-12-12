import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(3,"نام کاربری باید حداقل 3 کاراکتر باشد"),
  password: z.string().min(5,"پسورد باید حداقل 8 کاراکتر باشد"),
});

export type authSchemaType = z.infer<typeof authSchema>;