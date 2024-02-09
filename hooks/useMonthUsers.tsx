"use client";

import React, { useEffect, useState } from 'react';

interface MonthlyCounts {
  [key: string]: number;
}

const useMonthUsers = () => {
  const [dataFetch, setdataFetch] = useState([]);
  const [monthlyUsers, setMonthlyUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/admin/totaluser`);
        if (response.ok) {
          const data = await response.json();
          setdataFetch(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataFetch.length > 0) {
      const monthlyCounts: MonthlyCounts = {};
      dataFetch.forEach((comment: any) => {
        const expiresDate = new Date(comment.sessions[0]?.expires);
        const month = expiresDate.toLocaleString("en-US", {
          month: "long",
        });
        if (monthlyCounts[month]) {
          monthlyCounts[month]++;
        } else {
          monthlyCounts[month] = 1;
        }
      });

      // Convert the object to an array
      const monthlyData = Object.keys(monthlyCounts).map((month) => ({
        name: month,
        visit: monthlyCounts[month],
      }));

      setMonthlyUsers(monthlyData);
    }
  }, [dataFetch]);

  return { monthlyUsers };
};

export default useMonthUsers;
