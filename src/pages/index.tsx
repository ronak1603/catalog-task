import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "../components/Chart";
import handler from "./api/hello";
import FullScreen from "@/assets/icons/FullScreen";
import Compare from "@/assets/icons/Compare";
import { useRouter } from "next/router";

interface Data {
  current: number;
  change: number;
  percentageChange: number;
  weeklyData: number[];
}

export default function Home() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = () => {
      const response = handler();
      setData(response);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <main className="flex max-h-screen flex-col justify-between p-24 ">
      <div className="flex flex-col p-4 gap-6">
        <div className="flex items-start gap-1">
          <span className="text-7xl font-bold text-[#1A243A]">
            {data.current.toFixed(2)}
          </span>
          <span className="text-[#BDBEBF] text-2xl mt-2">USD</span>
        </div>
        <p
          className={`text-xl ${
            data.change > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {data.change > 0 ? "+" : ""}
          {data.change.toFixed(2)} ({data.percentageChange.toFixed(2)}%)
        </p>
        <div className="flex gap-6 items-center border-b border-[#EFF1F3] h-10  px-2 ">
          <span className="text-lg text-[#6F7177] h-full">Summary</span>
          <div className="border-[#4B40EE] border-b-[3px] px-2 h-full">
            <span className="text-lg text-[#6F7177] ">Chart</span>
          </div>
          <span className="text-lg text-[#6F7177] h-full  px-2 ">
            Statistic
          </span>
          <span className="text-lg text-[#6F7177] h-full  px-2 ">Analysis</span>
          <span className="text-lg text-[#6F7177] h-full  px-2 ">Setting</span>
        </div>

        <div className="flex gap-6 items-center mt-6 justify-between w-[800px]">
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-1">
              <FullScreen width={18} height={18} />
              <span className="text-lg text-[#6F7177]">Full Screen</span>
            </div>
            <div className="flex items-center gap-1">
              <Compare width={18} height={18} />
              <span className="text-lg text-[#6F7177]">Full Screen</span>
            </div>
          </div>
          <div className="flex  gap-4 items-center">
            <span className="text-lg text-[#6F7177]">1d</span>
            <span className="text-lg text-[#6F7177]">3d</span>
            <span className="text-lg bg-[#4B40EE] py-1 px-3 text-white border rounded ">
              1w
            </span>
            <span className="text-lg text-[#6F7177]">1m</span>
            <span className="text-lg text-[#6F7177]">6m</span>
            <span className="text-lg text-[#6F7177]">1y</span>
            <span className="text-lg text-[#6F7177]">max</span>
          </div>
        </div>
        <div className="flex">
          <Chart data={data.weeklyData} />
          <div className="relative flex flex-col gap-2 items-center">
            <span className="bg-[#1A243A] absolute top-20 rounded px-2 py-1 text-white">
              64850.71
            </span>
            <span className="bg-[#4B40EE] absolute top-44 rounded px-2 py-1 text-white">
              63179.71
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
