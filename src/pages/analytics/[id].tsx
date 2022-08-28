import { useEffect, useState } from "react";

import { Analytics } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChartProvider, LineSeries, Tooltip, XAxis, YAxis } from "rough-charts";
import { trpc } from "../../utils/trpc";
import { nullable } from "zod";

interface DateClicks {
  date: string;
  clicks: number;
}

type AssetMapData = {
  [key: string]: Analytics[];
};

const Analytics: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [dateClicksData, setDateClicksData] = useState<DateClicks[]>([]);

  const urlAnalytics = trpc.useQuery([
    "analyticsgetLinkAnalytics",
    { id: parseInt(id as string) },
  ]);

  const shortLink = trpc.useQuery([
    "shortCut.getShortLink",
    { id: parseInt(id as string) },
  ]);

  useEffect(() => {
    if (urlAnalytics.data) {
      const assetMapData: AssetMapData = {};
      urlAnalytics.data.forEach((data) => {
        const date = new Date(data.createdAt);
        const dateString = date.toDateString();

        if (assetMapData[dateString] === undefined) {
          assetMapData[dateString] = [data];
        } else {
          assetMapData[dateString]?.push(data);
        }
      });
      const dateChartData: DateClicks[] = [];
      Object.keys(assetMapData).forEach((key) => {
        dateChartData.push({ date: key, clicks: assetMapData[key].length });
      });

      setDateClicksData(dateChartData);
    }
  }, [urlAnalytics.data]);

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
      {dateClicksData && (
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Page Views</div>
            {/* Count all clicks in dataClicksData*/}
            <div className="stat-value">
              {dateClicksData.reduce((a, b) => a + b.clicks, 0)}
            </div>
          </div>
        </div>
      )}

      <div className="m-4 flex flex-col">
        <div className="my-4 w-screen">
          <ChartProvider data={dateClicksData} height={300}>
            <XAxis dataKey="date" />
            <LineSeries dataKey="clicks" />
            {/* <BarSeries dataKey="clicks" /> */}
            <YAxis dataKey="clicks" format={(count) => `${count}`} />
            <Tooltip>
              {({ date, clicks }) => `Views on ${date}: ${clicks}`}
            </Tooltip>
          </ChartProvider>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
