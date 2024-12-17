import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Link href="/shop/category/pytza">پیتزا</Link>
        </AccordionTrigger>
        <AccordionContent>
          <Link href="/shop/category/pyza/pytzadw-nfrh">پیتزا دونفره</Link>
        </AccordionContent>
        <AccordionContent>
          <Link href="/shop/category/pyza/pytzatk-nfrh">پیتزا تک نفره</Link>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <Link href="/shop/category/frngy">فرنگی</Link>
        </AccordionTrigger>
        <AccordionContent>
          <Link href="/shop/category/frngy/mrgh-swkhary">مرغ سوخاری</Link>
        </AccordionContent>
        <AccordionContent>
          <Link href="/shop/category/frngy/sandwych">ساندویچ</Link>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <Link href="/shop/category/pysh-ghtha">پیش غذا</Link>
        </AccordionTrigger>
        <AccordionContent>
          <Link href="/shop/category/pysh-ghtha/salad">سالاد</Link>
        </AccordionContent>
        <AccordionContent>
          <Link href="/shop/category/pysh-ghtha/syb-zmyny">سیب زمینی</Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
