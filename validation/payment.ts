import { z } from "zod";

export const PaymentSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "شماره کارت باید حداقل 16 رقم باشد")
    .max(16, "شماره کارت نباید بیش از 16 رقم باشد")
    .regex(/^\d{16}$/, "شماره کارت باید فقط شامل اعداد باشد"),
    
  internetPassword: z
    .string()
    .min(6, "رمز اینترنتی باید حداقل 6 کاراکتر باشد")
    .max(12, "رمز اینترنتی نباید بیشتر از 12 کاراکتر باشد"),
    
  Mounth: z
    .string()
    .min(1, "ماه باید حداقل 1 رقم باشد")
    .max(2, "ماه نباید بیشتر از 2 رقم باشد")
    .regex(/^(0[1-9]|1[0-2])$/, "ماه باید بین 01 تا 12 باشد"),
    
  year: z
    .string()
    .min(2, "سال باید حداقل 2 رقم باشد")
    .max(4, "سال نباید بیشتر از 4 رقم باشد")
    .regex(/^\d{2,4}$/, "سال باید فقط شامل اعداد باشد"),
    
  cvv2: z
    .string()
    .min(3, "CVV2 باید حداقل 3 رقم باشد")
    .max(4, "CVV2 نباید بیشتر از 4 رقم باشد")
    .regex(/^\d{3,4}$/, "CVV2 باید فقط شامل اعداد باشد"),
});

export type PaymentSchemaType = z.infer<typeof PaymentSchema>;