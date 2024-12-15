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
        <AccordionTrigger>پیتزا</AccordionTrigger>
        <AccordionContent>
          <Link href="/shop/category/pyza/pytzadw-nfrh">پیتزا دونفره</Link>
        </AccordionContent>
        <AccordionContent>
          <Link href="/shop/category/pyza/pytzatk-nfrh">پیتزا تک نفره</Link>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>فرنگی</AccordionTrigger>
        <AccordionContent></AccordionContent>
        <AccordionContent>ساندویچ</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>پیش غذا</AccordionTrigger>
        <AccordionContent>سالاد</AccordionContent>
        <AccordionContent>سیب زمینی</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
