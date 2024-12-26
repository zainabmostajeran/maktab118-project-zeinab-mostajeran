import Image from "next/image";
interface IAuthLayout {
  children: React.ReactNode;
}
const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-second rounded-md w-full min-h-screen ">
      <Image
        src="/logo_prev_ui.png"
        width={100}
        height={20}
        alt="Picture of the author"
      />
      {children}
    </div>
  );
};

export default AuthLayout;
