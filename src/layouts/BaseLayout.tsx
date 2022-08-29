import React, { Suspense } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Head from "next/head";

interface BaseLayoutProps {
  title: string;
  children?: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children, title }) => {
  const { status, data } = useSession();

  return (
    <Suspense>
      <Head>
        <title>{`Shortcut | ${title}`} </title>
        <meta name="description" content="Short Cut | Fastest URL Shortner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      {children}
    </Suspense>
  );
};
