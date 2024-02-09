import useBestCategory from "@/hooks/useBestCategory";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// const data = [
//   { name: "Mobile", value: 400, color: "#0088FE" },
//   { name: "Desktop", value: 300, color: "#00C49F" },
//   { name: "Laptop", value: 300, color: "#FFBB28" },
//   { name: "Tablet", value: 200, color: "#FF8042" },
// ];

type Props = {
  name: string;
  color: string[];
  value: number;
  chartData: object[];
};

const PieCharts = (props: Props) => {

  return (
    <div className="h-full flex flex-col justify-between">
      <h1>Best Category</h1>
      <div className="flex items-center justify-center w-full h-full">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={props?.chartData}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {props?.color.map((item: any) => (
                <Cell key={item} fill={item} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex whitespace-nowrap flex-nowrap  gap-2 items-center">
        {props.chartData.map((item: any) => (
          <div className="flex items-center flex-col" key={item.name}>
            <div className="flex flex-col gap-1 items-center">
              <div
                className="w-[10px] h-[10px] rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
              <span>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieCharts;
