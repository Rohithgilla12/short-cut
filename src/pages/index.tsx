import { signIn, signOut, useSession } from "next-auth/react";

import Head from "next/head";
import type { NextPage } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { trpc } from "../utils/trpc";

const CreateShortCutForm = dynamic(
  () => import("../components/CreateShortCutForm"),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  const { status, data } = useSession();

  const userLinks = trpc.useQuery(["shortCut.getAllShortLinksByUser"]);

  return (
    <>
      <Head>
        <title>Shortcut | Home</title>
        <meta name="description" content="Short Cut | Fastest URL Shortner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Short Cut</a>
          </div>
          <div className="flex-none gap-2">
            {status === "unauthenticated" ? (
              <button className="btn btn-primary" onClick={() => signIn()}>
                Sign in
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => signOut()}>
                Sign out
              </button>
            )}
          </div>
        </div>
        <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
          <CreateShortCutForm />
          {JSON.stringify(userLinks.data)}
        </main>
      </Suspense>
    </>
  );
};

export default Home;
