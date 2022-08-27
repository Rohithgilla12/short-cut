import { signIn, useSession } from "next-auth/react";

import Head from "next/head";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { status, data } = useSession();

  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Head>
        <title>Shortcut | Home</title>
        <meta name="description" content="Short Cut | Fastest URL Shortner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>

        {status === "unauthenticated" ? (
          <button onClick={() => signIn()}>Sign in</button>
        ) : (
          <text>{JSON.stringify(data, null, 2)}</text>
        )}
      </main>
    </>
  );
};

export default Home;
