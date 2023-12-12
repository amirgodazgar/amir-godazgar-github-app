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

// const user = {
//   login: "amirgodazgar",
//   id: 60295586,
//   node_id: "MDQ6VXNlcjYwMjk1NTg2",
//   avatar_url: "https://avatars.githubusercontent.com/u/60295586?v=4",
//   gravatar_id: "",
//   url: "https://api.github.com/users/amirgodazgar",
//   html_url: "https://github.com/amirgodazgar",
//   followers_url: "https://api.github.com/users/amirgodazgar/followers",
//   following_url:
//     "https://api.github.com/users/amirgodazgar/following{/other_user}",
//   gists_url: "https://api.github.com/users/amirgodazgar/gists{/gist_id}",
//   starred_url:
//     "https://api.github.com/users/amirgodazgar/starred{/owner}{/repo}",
//   subscriptions_url: "https://api.github.com/users/amirgodazgar/subscriptions",
//   organizations_url: "https://api.github.com/users/amirgodazgar/orgs",
//   repos_url: "https://api.github.com/users/amirgodazgar/repos",
//   events_url: "https://api.github.com/users/amirgodazgar/events{/privacy}",
//   received_events_url:
//     "https://api.github.com/users/amirgodazgar/received_events",
//   type: "User",
//   site_admin: false,
//   name: "Amir Godazgar",
//   company: null,
//   blog: "",
//   location: null,
//   email: null,
//   hireable: null,
//   bio: "A frontEnd developer who is passionate about Javascript and related frameworks and libraries also eager to solve challenges and learning new technologies ",
//   twitter_username: null,
//   public_repos: 6,
//   public_gists: 0,
//   followers: 5,
//   following: 14,
//   created_at: "2020-01-25T16:12:58Z",
//   updated_at: "2023-11-25T03:55:06Z",
// };

// const repo = {
//   id: 724621677,
//   node_id: "R_kgDOKzDZbQ",
//   name: "amir-godazgar-app",
//   full_name: "amirgodazgar/amir-godazgar-app",
//   private: false,
//   owner: {
//     login: "amirgodazgar",
//     id: 60295586,
//     node_id: "MDQ6VXNlcjYwMjk1NTg2",
//     avatar_url: "https://avatars.githubusercontent.com/u/60295586?v=4",
//     gravatar_id: "",
//     url: "https://api.github.com/users/amirgodazgar",
//     html_url: "https://github.com/amirgodazgar",
//     followers_url: "https://api.github.com/users/amirgodazgar/followers",
//     following_url:
//       "https://api.github.com/users/amirgodazgar/following{/other_user}",
//     gists_url: "https://api.github.com/users/amirgodazgar/gists{/gist_id}",
//     starred_url:
//       "https://api.github.com/users/amirgodazgar/starred{/owner}{/repo}",
//     subscriptions_url:
//       "https://api.github.com/users/amirgodazgar/subscriptions",
//     organizations_url: "https://api.github.com/users/amirgodazgar/orgs",
//     repos_url: "https://api.github.com/users/amirgodazgar/repos",
//     events_url: "https://api.github.com/users/amirgodazgar/events{/privacy}",
//     received_events_url:
//       "https://api.github.com/users/amirgodazgar/received_events",
//     type: "User",
//     site_admin: false,
//   },
//   html_url: "https://github.com/amirgodazgar/amir-godazgar-app",
//   description: null,
//   fork: false,
//   url: "https://api.github.com/repos/amirgodazgar/amir-godazgar-app",
//   forks_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/forks",
//   keys_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/keys{/key_id}",
//   collaborators_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/collaborators{/collaborator}",
//   teams_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/teams",
//   hooks_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/hooks",
//   issue_events_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/issues/events{/number}",
//   events_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/events",
//   assignees_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/assignees{/user}",
//   branches_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/branches{/branch}",
//   tags_url: "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/tags",
//   blobs_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/git/blobs{/sha}",
//   git_tags_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/git/tags{/sha}",
//   git_refs_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/git/refs{/sha}",
//   trees_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/git/trees{/sha}",
//   statuses_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/statuses/{sha}",
//   languages_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/languages",
//   stargazers_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/stargazers",
//   contributors_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/contributors",
//   subscribers_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/subscribers",
//   subscription_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/subscription",
//   commits_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/commits{/sha}",
//   git_commits_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/git/commits{/sha}",
//   comments_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/comments{/number}",
//   issue_comment_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/issues/comments{/number}",
//   contents_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/contents/{+path}",
//   compare_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/compare/{base}...{head}",
//   merges_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/merges",
//   archive_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/{archive_format}{/ref}",
//   downloads_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/downloads",
//   issues_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/issues{/number}",
//   pulls_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/pulls{/number}",
//   milestones_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/milestones{/number}",
//   notifications_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/notifications{?since,all,participating}",
//   labels_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/labels{/name}",
//   releases_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/releases{/id}",
//   deployments_url:
//     "https://api.github.com/repos/amirgodazgar/amir-godazgar-app/deployments",
//   created_at: "2023-11-28T13:07:26Z",
//   updated_at: "2023-11-28T13:09:01Z",
//   pushed_at: "2023-11-28T16:52:13Z",
//   git_url: "git://github.com/amirgodazgar/amir-godazgar-app.git",
//   ssh_url: "git@github.com:amirgodazgar/amir-godazgar-app.git",
//   clone_url: "https://github.com/amirgodazgar/amir-godazgar-app.git",
//   svn_url: "https://github.com/amirgodazgar/amir-godazgar-app",
//   homepage: null,
//   size: 198,
//   stargazers_count: 0,
//   watchers_count: 0,
//   language: "TypeScript",
//   has_issues: true,
//   has_projects: true,
//   has_downloads: true,
//   has_wiki: true,
//   has_pages: false,
//   has_discussions: false,
//   forks_count: 0,
//   mirror_url: null,
//   archived: false,
//   disabled: false,
//   open_issues_count: 0,
//   license: null,
//   allow_forking: true,
//   is_template: false,
//   web_commit_signoff_required: false,
//   topics: [],
//   visibility: "public",
//   forks: 0,
//   open_issues: 0,
//   watchers: 0,
//   default_branch: "main",
// };
