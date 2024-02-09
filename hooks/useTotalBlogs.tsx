"use client";
import React, { useEffect, useState } from "react";

const useTotalBlogs = () => {
  const [TotalBlog, setTotalUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/totalblog");
        if (response.ok) {
          const data = await response.json();
          setTotalUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return {TotalBlog};
};

export default useTotalBlogs;
