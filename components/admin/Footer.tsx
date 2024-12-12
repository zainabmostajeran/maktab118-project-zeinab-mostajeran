import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-base px-6 py-16 text-textColor">
      <div className="block container mx-auto sm:flex items-start justify-between max-w-[1400px]">

        <div className=" pt-5 sm:pt-0 flex items-center justify-center gap-x-3">
          <h1 className="font-bold">پیتزا نوشا</h1>
          <Image
            src="/logo_prev_ui.png"
            width={100}
            height={20}
            alt="Picture of the author"
          />{" "}
        </div>
        <div className="flex gap-x-12 items-center justify-center pb-4">
          <div className="flex flex-col gap-4 items-center justify-center">
            <p>درباره ما</p>
            <p>تیم ما</p>
            <p>تماس با ما</p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <p>مارا دنبال کنید </p>
            <p>محصولات ما</p>
            <p>شبکه های اجتماعی</p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <p>شرایط </p>
            <p>قوانین</p>
            <p>ضوابط</p>
          </div>
        </div>
      </div>
      <div className=" block sm:flex items-center justify-between pt-10">
      <p className="text-center pt-16 sm:p-0 text-xs">@2024 پیتزانوشا</p>

        <div className="flex gap-6 items-center justify-center text-3xl">
          <Link href="#">
            <FaFacebook />
          </Link>
          <Link href="#">
            <FaTwitter />
          </Link>
          <Link href="#">
            <FaGithub />
          </Link>
          <Link href="#">
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
