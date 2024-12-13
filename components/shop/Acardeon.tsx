import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>پیتزا</AccordionTrigger>
        <AccordionContent>
          پیتزا دونفره
        </AccordionContent>
        <AccordionContent>
          پیتزا تک نفره
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>فرنگی</AccordionTrigger>
        <AccordionContent>
          مرغ سوخاری
        </AccordionContent>
        <AccordionContent>
         ساندویچ
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>پیش غذا</AccordionTrigger>
        <AccordionContent>
          سالاد
        </AccordionContent>
        <AccordionContent>
          سیب زمینی
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
