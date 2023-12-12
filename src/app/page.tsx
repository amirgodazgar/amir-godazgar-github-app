import Request from "@/config/axios-config";
import { FolderArrowDownIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

type RepositoryAPI = {
  id: string;
  name: string;
  private: string;
  created_at: string;
  language: string;
};
type Repository = {
  id: string;
  name: string;
  private: string;
  createdAt: string;
  language: string;
};

const getRepos = async (username: string) => {
  try {
    const response = await Request.get(`/users/${username}/repos`);
    if (response.status === 200) return response.data;
  } catch (error) {
    throw new Error("Could not catch repositories!");
  }
};

const getUser = async (id: string) => {
  try {
    const response = await Request.get(`/user/${id}`);
    if (response.status === 200) return response.data;
  } catch (error) {
    throw new Error("Could not catch user!");
  }
};

export default async function Home() {
  const session = await getServerSession(options);
  const id = session?.user?.id;
  const user = await getUser(id);
  const username = user?.login;
  const repos = await getRepos(username);

  const repositories = repos.map((i: RepositoryAPI) => ({
    id: i.id,
    name: i.name,
    private: i.private,
    createdAt: i.created_at,
    language: i.language,
  }));

  return (
    <div className="flex flex-col gap-y-8 p-6 h-full w-full sm:w-[90%] md:w-full lg:w-full xl:w-[70%] m-auto">
      <div>
        <p className="text-2xl lg:text-3xl font-bold text-slate-100">
          Repository
        </p>
      </div>
      <ul className="flex flex-col gap-y-4 h-full lg:px-2 py-4 text-slate-900">
        {repositories.map((i: Repository) => (
          <li className=" grid grid-cols-4 gap-y-2 lg:flex lg:justify-between lg:items-center p-2 lg:p-5 shadow-lg shadow-black rounded-md bg-slate-50">
            <div className="col-start-1 col-end-5 flex justify-between items-center lg:gap-x-16 w-full lg:w-[60%]  ">
              <div className="w-3/5 lg:w-1/2 xl:w-64">
                <p className="font-bold truncate xl:text-lg">{i.name}</p>
                <p className="text-xs text-start px-2 text-slate-100 rounded-lg w-20 bg-pink-500">
                  {i.language}
                </p>
              </div>
              <div className="w-2/5 lg:w-1/2 xl:w-36">
                <p className="text-base  w-12 px-1 text-center rounded-lg">
                  {i.private ? "Private" : "Public"}
                </p>
                <p className="text-xs text-slate-100 bg-teal-500 w-24 px-1 text-start rounded-lg">
                  {i.createdAt.slice(0, 10)}
                </p>
              </div>
            </div>
            <div className="col-start-1 col-end-5">
              <a
                download={i?.name}
                href={`https://api.github.com/repos/${username}/${i?.name}/zipball`}
                className="group flex justify-center items-center gap-x-2 px-3 py-2 rounded-md text-md bg-teal-500 text-slate-100 hover:bg-teal-600 duration-200 ease-in-out"
              >
                Download
                <FolderArrowDownIcon className="h-6 w-6 text-slate-100 " />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
