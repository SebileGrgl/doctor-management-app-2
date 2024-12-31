"use client";
import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import { GenderRatio, YearlyGenderRatio } from "@/types/types";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const GenderChart: FC<GenderRatio> = ({ selectedYearAnalytics }) => {
  const { year, female_percentage, male_percentage, children_percentage } =
    selectedYearAnalytics;

  const [series, setSeries] = useState<number[]>([
    male_percentage,
    female_percentage,
    children_percentage,
  ]);
  const [chartKey, setChartKey] = useState<number>(0);
  useEffect(() => {
    setSeries([male_percentage, female_percentage, children_percentage]);
    setChartKey((prev) => prev + 1);
  }, [selectedYearAnalytics]);

  const options: ApexOptions = {
    chart: {
      type: "donut",
      width: 200,
      height: 200,
    },
    colors: ["#4b7bec", "#ff6348", "#ffa502"],
    labels: ["Male", "Female", "Children"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",

      itemMargin: {
        horizontal: 10,
        vertical: 10,
      },
      formatter: (seriesName, opts) => {
        const percentage = series[opts.seriesIndex];
        return `${seriesName}: ${percentage}%`;
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "right",
            itemMargin: {
              horizontal: 0,
              vertical: 5,
            },
          },
        },
      },
    ],
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          key={chartKey}
          options={options}
          series={series}
          type="donut"
        />
      </div>
    </div>
  );
};

export default GenderChart;
