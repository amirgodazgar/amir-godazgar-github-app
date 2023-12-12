import User from "./user";
import { Logo } from "./logo";

export type Props = {
  name: string;
  username: string;
  image: string;
};

const Header = () => {
  return (
    <header className="z-99999 sticky top-0 flex w-full bg-white border-b border-slate-100 shadow-md">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-5">
        <div className="hidden sm:block">
          <Logo />
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
