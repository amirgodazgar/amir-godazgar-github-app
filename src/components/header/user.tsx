"use client";
import { useState } from "react";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import UserInfo from "./user-info";
import { signIn, signOut, useSession } from "next-auth/react";

const User = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: session } = useSession();
  const isLogin = !!session;


  return (
    <div className="relative">
      {isLogin ? (
        <UserInfo
          isDropdownOpen={dropdownOpen}
          onDropdownOpen={setDropdownOpen}
        />
      ) : (
        <button
          className="group border rounded-md flex items-center gap-x-2 py-3 px-5 text-sm font-medium duration-200 ease-in-out hover:text-white hover:bg-gray-700 lg:text-md"
          onClick={() => signIn()}
        >
          Sign In
          <ArrowLeftOnRectangleIcon className="h-6 w-6 text-slate-700  group-hover:text-white" />
        </button>
      )}

      {/* <!-- Dropdown --> */}
      <div
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-[-61px] sm:right-0 lg:right-0 mt-4 flex w-[10rem] lg:w-auto flex-col border border-stroke bg-white shadow-default rounded-md ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col px-5">
          <li></li>
        </ul>
        <button
          className="flex items-center gap-x-2 py-3 px-5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-md"
          onClick={() => signOut()}
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6 text-slate-700" />
          Sign Out
        </button>
      </div>
      {/* <!-- Dropdown --> */}
    </div>
  );
};

export default User;
