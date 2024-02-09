"use client";

import React, { useEffect, useState } from "react";

const useBestCategory = () => {
  const [data, setData] = useState([]);
  const [dataSort, setDataSort] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/bestcat");
      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getBestCategory = () => {
    try {
      // Assuming each item in the data array has a property named 'usageCount'
      const sortedData = data
        .reduce((uniqueData: any, item: any) => {
          // Check if the category name is already in the uniqueData array
          const existingItem = uniqueData.find(
            (uItem: any) => uItem.catName === item.catName
          );

          // If not found, add it to uniqueData
          if (!existingItem) {
            uniqueData.push(item);
          }

          return uniqueData;
        }, [])
        .sort((a: any, b: any) => (b.usageCount || 0) - (a.usageCount || 0));

      // Get the top 4 categories
      const topCategories = sortedData
        .slice(0, 4)
        .map((item: any) => item.catName);
      // Objeyi diziye dönüştür
      const monthlyData = topCategories.map((category: any) => ({
        name: category,
        value: data.filter((item: any) => item.catName === category).length,
      }));

      setDataSort(monthlyData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getBestCategory();
  }, [data]);

  return { dataSort };
};

export default useBestCategory;
