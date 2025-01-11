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
    .string()
    .nullable()
    .refine((val) => val !== null && val !== "", {
      message: "زمان تحویل الزامی است",
    })
    // .refine(
    //   (val) => {
    //     if (!val) return false;
    //     const selectedDate = new Date(val);
    //     const today = new Date();
    //     today.setHours(0, 0, 0, 0); 
    //     return selectedDate >= today;
    //   },
    //   {
    //     message: "زمان تحویل نمی‌تواند در گذشته باشد",
    //   }
    // ),
});
export type OrderDataSchemaType = z.infer<typeof OrderDataSchema>;
