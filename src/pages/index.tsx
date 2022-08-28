import { signIn, useSession } from "next-auth/react";

import { CreateShortCutForm } from "../components/CreateShortCutForm";
import Head from "next/head";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { status, data } = useSession();

  const hello = trpc.useQuery(["shortCut.getShortLink", { slug: "meme" }]);

  return (
    <>
      <Head>
        <title>Shortcut | Home</title>
        <meta name="description" content="Short Cut | Fastest URL Shortner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
          {hello.data ? <p>{JSON.stringify(hello.data)}</p> : <p>Loading..</p>}
        </div>

        {status === "unauthenticated" ? (
          <button onClick={() => signIn()}>Sign in</button>
        ) : (
          <text>{JSON.stringify(data, null, 2)}</text>
        )}
        <CreateShortCutForm />
        <button
          onClick={async () => {
            const shortLink = hello.data!;

            // await createShortLink(shortLink);
            console.log(shortLink);
          }}
        >
          Test REdis
        </button>
      </main>
    </>
  );
};

export default Home;
