import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

type Props = {
  title: string;
  color: string;
  dataKey: string[];
  chartData: object[];
};

const BarCharts = (props: Props) => {
  return (
    <div className="w-full h-full">
      <h1>{props.title}</h1>
      <div className="">
        <ResponsiveContainer width="99%" height={100}>
          <BarChart width={150} height={40} data={props.chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
         {Array.isArray(props.dataKey) && props.dataKey.map((item) => (
              <React.Fragment key={item}>
                <XAxis dataKey={item} />
                <Bar dataKey={item} fill={props.color} />
              </React.Fragment>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarCharts;
