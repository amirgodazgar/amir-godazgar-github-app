import Link from "next/link";
import defaultImage from "/public/avatar.jpeg";
import Image from "next/image";
import {
  CircleStackIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Request from "@/config/axios-config";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const getUser = async (id: string) => {
  try {
    const response = await Request.get(`/user/${id}`);
    if (response.status === 200) return response.data;
  } catch (error) {
    throw new Error("Could not catch user!");
  }
};

const Sidebar = async () => {
  const session = await getServerSession(options);
  const id = await session?.user?.id;
  const user = await getUser(id);

  return (
    <aside
      className={`flex w-full flex-col overflow-y-hidden bg-white rounded-b-md p-6 border shadow-lg shadow-black`}
    >
      <div className="flex items-center justify-center gap-2 py-5.5 lg:py-6.5">
        <Image
          width={176}
          height={32}
          src={user?.avatar_url || defaultImage}
          alt="Logo"
          className="rounded-full"
        />
      </div>

      <div className="no-scrollbar flex flex-col mt-10 overflow-y-auto duration-300 ease-linear">
        <div className="flex flex-col gap-y-4 w-full ">
          <div>
            <p className="text-xl font-bold text-black">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm text-black">{user?.bio}</p>
          </div>
          <div className="flex justify-start items-center gap-x-2 text-sm">
            <UsersIcon className="h-5 w-5 text-slate-700" />
            <p>Follower {user?.followers}</p>
            <p>|</p>
            <p>Following {user?.following}</p>
          </div>
        </div>
        {/* <!-- Sidebar Menu --> */}
        <nav className="flex flex-col justify-center items-start mt-10">
          {/* <!-- Menu Group --> */}
          <div className="w-full">
            <h3 className="mb-4 text-sm font-semibold">MENU</h3>

            <ul className="mb-6 flex flex-col justify-stretch gap-2 w-full">
              {/* <!-- Profile --> */}
              <li>
                <Link
                  href="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-gray-100 cursor-not-allowed`}
                >
                  <button
                    disabled
                    className="flex items-center gap-2.5 disabled:text-slate-400 cursor-not-allowed"
                  >
                    <UserIcon className="h-6 w-6 text-slate-400" />
                    Profile
                  </button>
                </Link>
              </li>
              {/* <!-- Profile --> */}

              {/* <!-- Repositories --> */}
              <li>
                <Link
                  href="/repositories"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-gray-100 cursor-not-allowed`}
                >
                  <button
                    disabled
                    className="flex items-center gap-2.5 disabled:text-slate-400 cursor-not-allowed"
                  >
                    <CircleStackIcon className="h-6 w-6 text-slate-400" />
                    Repositories
                  </button>
                </Link>
              </li>
              {/* <!-- Repositories --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
