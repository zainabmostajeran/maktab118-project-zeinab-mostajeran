import { z } from "zod";
const validCities = [
  "تهران",
  "مشهد",
  "اصفهان",
  "شیراز",
  "تبریز",
  "کرج",
  "قم",
  "اهواز",
  "رشت",
  "کرمانشاه",
];

const validProvinces = [
  "تهران",
  "خراسان رضوی",
  "اصفهان",
  "فارس",
  "آذربایجان شرقی",
  "البرز",
  "قم",
  "خوزستان",
  "گیلان",
  "کرمانشاه",
];

export const OrderDataSchema = z.object({
  firstName: z.string().min(2, "حداقل 2 کاراکتر وارد کنید"),
  lastName: z.string().min(2, "حداقل 2 کاراکتر وارد کنید"),
  phoneNumber: z
    .string()
    .min(11, "شماره تماس باید حداقل 11 کاراکتر باشد")
    .refine((value) => /^(\+98|0)?9\d{9}$/g.test(value), "شماره تماس نامعتبر"),
  address: z
    .string()
    .min(10, "آدرس باید حداقل 10 کاراکتر باشد")
    .refine((value) => /\d/.test(value), "آدرس نامعتبر"),
  city: z
    .string()
    .min(1, "شهر الزامی است.")
    .refine((city) => validCities.includes(city), {
      message: "شهر نامعتبر است.",
    }),
  province: z
    .string()
    .min(1, "استان الزامی است.")
    .refine((province) => validProvinces.includes(province), {
      message: "استان نامعتبر است.",
    }),
  deliveryDate: z
    .date({
      required_error: "زمان تحویل الزامی است.",
      invalid_type_error: "زمان تحویل باید تاریخ معتبر باشد.",
    })
    .refine((date) => date >= new Date(), {
      message: "زمان تحویل نمی‌تواند در گذشته باشد.",
    }),
});
export type OrderDataSchemaType = z.infer<typeof OrderDataSchema>;
