import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

const Analytics: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  //Future Scope: Check if the user is authenticated and if the user is the owner of the short link
  const urlAnalytics = trpc.useQuery([
    "analyticsgetLinkAnalytics",
    { id: parseInt(id as string) },
  ]);
  return (
    <>
      <div>Analytics</div>
      {JSON.stringify(urlAnalytics.data)}
    </>
  );
};

export default Analytics;
