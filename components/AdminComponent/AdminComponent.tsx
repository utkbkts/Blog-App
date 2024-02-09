import React from "react";
import Topbar from "./admintopbar/Topbar";
import Chart from "./adminchart/Chart";
import BarCharts from "./adminbarChart/BarChart";
import PieCharts from "./pieChart/PieChart";
import BigChartBox from "./bigChart/BigChart";

interface Props {
  BarChartBoxVisit: {
    title: string;
    color: string;
    dataKey: string[];
    chartData: object[];
  };
  barChartBoxRevenue:{
    title: string;
    color: string;
    dataKey: string[];
    chartData: object[];
  }
  ChartBoxCategory:{
    color: string[];
    name: string;
    chartData: object[];
    value: number;
  }
  ChartBoxComment:{
    title: string;
    color: string[];
    icon:  React.ReactElement;
    percentage:number;
    dataKey: string;
    chartData: object[];
  }
  ChartBoxBlog:{
    title: string;
    color: string[];
    icon:  React.ReactElement;
    percentage:number;
    dataKey: string;
    chartData: object[];
  }
  ChartTotalBlogs:{
    title: string;
    color: string[];
    icon:  React.ReactElement;
    percentage:number;
    dataKey: string;
    chartData: object[];
  }
}

const AdminComponent = ({BarChartBoxVisit,barChartBoxRevenue,ChartBoxCategory,ChartBoxComment,ChartBoxBlog,ChartTotalBlogs}:Props) => {
  return (
    <div className="home overflow-hidden w-full gap-4 grid-cols-4 h-screen bg-darkcolor text-softcolor">
      <div className="box box1">
        <Topbar />
      </div>
      <div className="box  box2">
        <Chart {...ChartBoxComment} />
      </div>
      <div className="box box3">
        <Chart {...ChartBoxBlog} />
      </div>
      <div className="box box4">
        <PieCharts {...ChartBoxCategory}/>
      </div>
      <div className="box box6">
        <Chart {...ChartTotalBlogs}/>
      </div>
      <div className="box  box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarCharts {...barChartBoxRevenue} />
      </div>
      <div className="box box9">
        <BarCharts {...BarChartBoxVisit} />
      </div>
    </div>
  );
};

export default AdminComponent;
