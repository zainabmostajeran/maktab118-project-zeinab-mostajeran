import { z } from "zod";

export const signupSchema = z
  .object({
    firstname: z.string().min(2, "حداقل 2 کاراکتر وارد کنید"),
    lastname: z.string().min(2, "حداقل 2 کاراکتر وارد کنید"),
    phoneNumber: z
      .string()
      .min(11, "شماره تماس باید حداقل 11 کاراکتر باشد")
      .refine(
        (value) => /^(\+98|0)?9\d{9}$/g.test(value),
        "شماره تماس نامعتبر"
      ),
    username: z
      .string()
      .min(4, "نام کاربری باید حداقل 4 کاراکتر باشد")
      .refine((value) => !/\d+/g.test(value), "نام کاربری نامعتبر"),
    password: z
      .string()
      .min(8, "پسورد باید حداقل 8 کاراکتر باشد")
      .refine(
        (value) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(value),
        "پسورد نامعتبر"
      ),
    email: z
      .string()
      .min(8, "ایمیل باید حداقل 8 کاراکتر باشد")
      .refine(
        (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value),
        "ایمیل نامعتبر"
      ),
    repeatPassword: z
      .string()
      .min(8, "تکرار رمزعبور باید حداقل 8 کاراکتر باشد"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "پسورد و تکرار آن باید یکسان باشند",
    path: ["repeatPassword"],
  });

export type signupSchemaType = z.infer<typeof signupSchema>;
