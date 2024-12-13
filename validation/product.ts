import { z } from "zod";

const validSize = 1; // MB
const validThumbnailTypes = ["image/png", "image/jpeg", "image/jpg"];
const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];

export const ProductSchema = z.object({
  category: z.string().min(1, "دسته بندی نباید خالی باشد"),
  subcategory: z.string().min(1, "زیردسته بندی نباید خالی باشد"),
  name: z
    .string()
    .min(4, "نام کالا باید حداقل 4 کاراکتر باشد")
    .refine((value) => !/\d+/g.test(value), "نام کالا نامعتبر"),
  price: z
    .string()
    .min(4, "قیمت کالا باید حداقل 4 کاراکتر باشد")
    .refine((value) => /^\d+/g.test(value), "قیمت کالا نامعتبر"),
  quantity: z
    .string()
    .min(1, "موجودی کالا باید حداقل 1 کاراکتر باشد")
    .refine((value) => /^\d+/g.test(value), "موجوی کالا نامعتبر"),
  brand: z
    .string()
    .min(5, "برند باید حداقل 5 کاراکتر باشد")
    .refine((value) => !/\d+/g.test(value), "برند کالا نامعتبر"),
  thumbnail: z.any().refine((file) => {
    return validThumbnailTypes.includes(file?.type);
  }, ` عکس مربوط به محصول را حتما با تایپ ${validThumbnailTypes.join(", ")} وارد کنید `),
  description: z.string().nonempty("توضیحات الزامی است"),
  images: z.array(z.any()).optional(),
});
export type ProductSchemaType = z.infer<typeof ProductSchema>;
