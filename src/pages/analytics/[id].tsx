import { ChartProvider, LineSeries, Tooltip, XAxis, YAxis } from "rough-charts";

import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

const Analytics: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const urlAnalytics = trpc.useQuery([
    "analyticsgetGraphData",
    { id: parseInt(id as string) },
  ]);

  const shortLink = trpc.useQuery([
    "shortCut.getShortLink",
    { id: parseInt(id as string) },
  ]);

  //Future Scope: Check if the user is authenticated and if the user is the owner of the short link

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl">Analytics</h2>
      {/* Show the link and slug */}
      {shortLink.data && (
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl">Link: {shortLink.data.url}</h3>
          <h3 className="text-xl">Slug: {shortLink.data.slug}</h3>
        </div>
      )}
      {urlAnalytics.data && (
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Page Views</div>
            {/* Count all clicks in dataClicksData*/}
            <div className="stat-value">
              {urlAnalytics.data.dateChartData.reduce(
                (a, b) => a + b.clicks,
                0
              )}
            </div>
          </div>
        </div>
      )}

      <div className="m-4 flex flex-col">
        <div className="my-4 w-screen">
          {urlAnalytics.data && (
            <ChartProvider data={urlAnalytics.data.dateChartData} height={300}>
              <XAxis dataKey="date" />
              <LineSeries dataKey="clicks" />
              {/* <BarSeries dataKey="clicks" /> */}
              <YAxis dataKey="clicks" format={(count) => `${count}`} />
              <Tooltip>
                {({ date, clicks }) => `Views on ${date}: ${clicks}`}
              </Tooltip>
            </ChartProvider>
          )}
        </div>
      </div>
      <div className="card  bg-bg-primary w-full text-neutral-content">
        <div className="card-body items-center">
          <h2 className="card-title">Future Scope</h2>
          <ul>
            <li>
              Time analysis, know when your users are most actively visting the
              link
            </li>
            <li>Export data into your favorite type</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
