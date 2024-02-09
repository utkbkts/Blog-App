"use client"
import { useEffect, useState } from "react";


const useMonthComment = () => {
  const [dataFetch, setdataFetch] = useState<any[]>([]);
  const [monthlyComments, setMonthlyComments] = useState<{ name: string; visit: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/admin/totalcomment`);
        if (response.ok) {
          const data = await response.json();
          setdataFetch(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataFetch.length > 0) {
      const monthlyCounts: { [key: string]: number } = {};
      dataFetch.forEach((comment: any) => {
        const month = new Date(comment.createdAt).toLocaleDateString("en-US", { month: "long" });
        if (monthlyCounts[month]) {
          monthlyCounts[month]++;
        } else {
          monthlyCounts[month] = 1;
        }
      });

      // Convert object to array
      const monthlyData = Object.keys(monthlyCounts).map((month) => ({
        name: month,
        visit: monthlyCounts[month],
      }));

      setMonthlyComments(monthlyData);
    }
  }, [dataFetch]);

  return { monthlyComments };
};

export default useMonthComment;
