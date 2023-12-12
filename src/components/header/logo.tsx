import React from "react";
import defaultImage from "/public/GitHu.png";
import Image from "next/image";

type Props = {};

export const Logo = (props: Props) => {
  return (
    <div className="flex justify-start items-center gap-2">
      <span className=" rounded-full">
        <Image
          width={70}
          height={70}
          src={defaultImage}
          alt="User"
          className="rounded-full"
        />
      </span>
      <div>
        <p className="text-black text-2xl font-bold">Github</p>
        <p className="text-slate-400 text-xs w-[15rem]">
          GitHub is a for-profit company offering a cloud-based Git repository
        </p>
      </div>
    </div>
  );
};
