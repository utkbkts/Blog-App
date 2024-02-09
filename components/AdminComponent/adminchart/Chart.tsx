import Link from "next/link";
import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  color: string[];
  icon:  React.ReactElement;
  title: string;
  dataKey: string;
  number?: number | string;
  percentage: number;
  chartData: object[];
};

const Chart = (props:Props) => {
  
  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col">
          <span className="text-[12px]">{props.icon}</span>
          <span className="text-[14px]">{props.title}</span>
        </div>
        <div className="flex flex-col gap-1">
          <h1>{props.number}</h1>
          <Link className="whitespace-nowrap" href={"/"} style={{ color: props.color[0] }}>
            View All
          </Link>
        </div>
      </div>
      <div className="flex-[2] flex flex-col justify-between">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col items-end justify-end">
          <span
            className={`font-bold ${
              props.percentage < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {props.percentage}
          </span>
          <span className="text-[14px] text-right">This Month</span>
        </div>
      </div>
    </div>
  );
};

export default Chart;
