"use client";
import Image from "next/image";
import defaultImage from "/public/avatar.jpeg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Request from "@/config/axios-config";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Props = {
  isDropdownOpen: boolean;
  onDropdownOpen: (state: boolean) => void;
};

const getUser = async (id: string) => {
  try {
    const response = await Request.get(`/user/${id}`);
    if (response.status === 200) return response.data;
  } catch (error) {
    throw new Error("Could not catch user!");
  }
};

const UserInfo = ({ onDropdownOpen, isDropdownOpen }: Props) => {
  const [userInfo, setUserInfo] = useState();
  const { data: session } = useSession();
  const isLogin = !!session;

  useEffect(() => {
    if (isLogin) {
      const id = session?.user?.id;
      getUser(id).then((user) => setUserInfo(user));
    }
  }, []);

  return (
    <button
      onClick={() => onDropdownOpen(!isDropdownOpen)}
      className="flex items-center gap-4"
    >
      <span className="hidden text-right lg:block">
        <span className="block text-sm font-medium text-black">
          {userInfo?.name}
        </span>
        <span className="block text-xs">{userInfo?.login}</span>
      </span>

      <span className="h-12 w-12 rounded-full">
        <Image
          width={112}
          height={112}
          src={userInfo?.avatar_url || defaultImage}
          alt="User"
          className="rounded-full"
        />
      </span>
      <ChevronDownIcon className="h-6 w-6 text-slate-700" />
    </button>
  );
};

export default UserInfo;
