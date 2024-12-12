import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(4,"نام کاربری باید حداقل 4 کاراکتر باشد")
  .refine((value) => !/\d+/g.test(value), "Invalid username"),
  password: z.string()
    .min(8, "پسورد باید حداقل 8 کاراکتر باشد")
    .refine((value) =>/ ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Invalid password"),
});
export type authSchemaType = z.infer<typeof authSchema>;
