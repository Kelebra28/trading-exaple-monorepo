"use client";

import {
  DataGrid,
  trendColumns,
  historicalColumns,
} from "../../../../libs/ui-components/src";
import PriceChartWrapper from "@/DynamicCommponets/PriceChart";

import {
  HistoricalData,
  DailyTrendData,
  TransformedHistoricalData,
} from "../../../../libs/utils/src";

interface HistoricalDataViewProps {
  historicalData: HistoricalData[];
  dailyTrendData: DailyTrendData[];
  transformedHistoricalData: TransformedHistoricalData[];
  symbol: string;
  loading: boolean;
  error?: string | null;
}

export const HistoricalDataView = ({
  historicalData,
  dailyTrendData,
  transformedHistoricalData,
  symbol,
  loading,
  error,
}: HistoricalDataViewProps) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Historical Prices</h2>
          <DataGrid<HistoricalData>
            data={historicalData}
            columns={historicalColumns}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Daily Trends</h2>
          <DataGrid<DailyTrendData>
            data={dailyTrendData}
            columns={trendColumns}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Price Chart - {symbol}</h2>
        <PriceChartWrapper data={transformedHistoricalData} />
      </div>
    </>
  );
};
