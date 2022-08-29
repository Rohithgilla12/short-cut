import { BaseLayout } from "../layouts/BaseLayout";
import Link from "next/link";
import type { NextPage } from "next";
import copy from "copy-to-clipboard";
import dynamic from "next/dynamic";
import { trpc } from "../utils/trpc";

const CreateShortCutForm = dynamic(
  () => import("../components/CreateShortCutForm"),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  const userLinks = trpc.useQuery(["shortCut.getAllShortLinksByUser"]);

  return (
    <BaseLayout title={"Home"}>
      <>
        <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-1/3 prose ">
            <h3>
              Short Cut is blazingly fast URL shortner service. It is built on
              top of redis.
            </h3>
            <ul>
              <li>Provides a great visual analytics of your short links.</li>
              <li>Fastest redirects to your original URL.</li>
              <li>No need to wait for the page to load.</li>
            </ul>
          </div>
          <CreateShortCutForm />
          <button
            onClick={() => userLinks.refetch()}
            className="btn btn-outline my-4"
          >
            Refresh Data
          </button>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>URL</th>
                  <th>Slug</th>
                  <th>Analytics</th>
                  <th>Copy</th>
                </tr>
              </thead>
              <tbody>
                {userLinks.isLoading ? (
                  <div>Loading...</div>
                ) : (
                  userLinks.data?.map((link) => (
                    <tr key={link.id}>
                      <th>{link.id}</th>
                      <td>
                        <a className="link" href={link.url}>
                          {link.url}
                        </a>
                      </td>
                      <td>{link.slug}</td>
                      <td>
                        <Link href={`/analytics/${link.id}`}>
                          <span className="link">Analytics</span>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            copy(
                              `https://short-cut-redis.vercel.app/r/${link.slug}`
                            )
                          }
                          className="btn btn-square btn-outline"
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </>
    </BaseLayout>
  );
};

export default Home;
