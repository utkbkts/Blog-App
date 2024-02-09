"use client"
import AdminComponent from '@/components/AdminComponent/AdminComponent';
import useBestCategory from '@/hooks/useBestCategory';
import useMonthComment from "@/hooks/useMonthComment"
import useMonthUsers from '@/hooks/useMonthUsers';
import useTotalUsers from '@/hooks/useTotalUsers';
import useTotalComment from '@/hooks/useTotalComment';
import { useEffect } from 'react';
import { AiOutlineComment, AiOutlineUser } from 'react-icons/ai';
import { CgFormatHeading } from 'react-icons/cg';
import { BsBasket } from 'react-icons/bs';
import useTotalBlogs from '@/hooks/useTotalBlogs';

const Admin = () => {
//!  Bir ayda yapılan yorum sayısı
  const { monthlyComments } = useMonthComment();
  const { monthlyUsers } = useMonthUsers();
  const { dataSort } = useBestCategory();
  const {totalcomment}=useTotalComment()
  const {TotalUser}=useTotalUsers()
  const {TotalBlog}=useTotalBlogs()
  const totalCommentCount = totalcomment.length;
  const percentage = totalCommentCount > 0 ? (totalCommentCount / totalCommentCount) * 100 : 0;
  const barChartData = monthlyComments.map((item:any) => ({
    name: item.name,
    visit: item.visit
  }));

  const BarChartBoxVisit = {
    title: "Total Comment's Month",
    color: "#FF8042",
    dataKey: ["name","visit"],
    chartData: barChartData
  };

//!  Bir ayda üye olan sayısı

const barChartDataUser = monthlyUsers.map((item:any)=>({
  name:item.name,
  visit:item.visit
}))
const barChartBoxRevenue = {
  title: "Total User's Month",
  color: "#FF8042",
  dataKey: ["name","visit"],
  chartData: barChartDataUser
};

//!best category

const ChartBoxCategory={
  color:["#0088FE","#00C49F","#FFBB28","#FF8042"],
  name:"Best Category",
  value: dataSort.length > 0 ? dataSort[0] : 0,
  chartData:dataSort
}
//!totalcomment
const barChartCommenttotal = totalcomment.map((item:any,index:any)=>({
  name:item.body,
  ratio:index + 1
}))

const ChartBoxComment={
  color:["#00C49F"],
  icon:<AiOutlineComment/>,
  title:"Total Comment's",
  dataKey: "ratio",
  percentage: percentage,
  number:totalcomment.length,
  chartData:barChartCommenttotal
}

//!totalBlog
const barChartUserBlog = TotalUser.map((item:any,index:any)=>({
  name:item.name,
  ratio:index + 1
}))

const ChartBoxBlog={
  color:["#0088FE"],
  icon:<AiOutlineUser/>,
  title:"Total User's",
  dataKey: "ratio",
  percentage: percentage,
  number:TotalUser.length,
  chartData:barChartUserBlog
}

//!totalblogs
const barChartTotalBlog = TotalBlog.map((item:any,index:any)=>({
  name:item.name,
  ratio:index + 1
}))
const ChartTotalBlogs={
  color:["#0088FE"],
  icon:<BsBasket/>,
  title:"Total Blog's",
  dataKey: "ratio",
  percentage: percentage,
  number:TotalUser.length,
  chartData:barChartTotalBlog
}


  return (
    <div className='flex'>
      <AdminComponent ChartTotalBlogs={ChartTotalBlogs} ChartBoxBlog={ChartBoxBlog} ChartBoxComment={ChartBoxComment} ChartBoxCategory={ChartBoxCategory} barChartBoxRevenue={barChartBoxRevenue} BarChartBoxVisit={BarChartBoxVisit}/>
    </div>
  );
};

export default Admin;
