import Image from "next/image";
import  {AccordionDemo}  from "../../components/shop/Acardeon";
export const SidebarCategory: React.FC = () => {
  return (
    <div className=" bg-base rounded-lg px-10 w-full h-96 text-white flex flex-col items-center justify-start">
      <div className=" pt-5 sm:pt-0 flex items-center justify-center gap-x-3">
        <h1 className="font-bold">پیتزا نوشا</h1>
        <Image
            src="/logo_prev_ui.png"
            width={100}
            height={20}
            alt="Picture of the author"
          />
      </div>
      {/* acardeon */}
      <AccordionDemo/>
    </div>
  );
};
