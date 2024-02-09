"use client";
import React, { useEffect, useState } from "react";

const useTotalUsers = () => {
  const [TotalUser, setTotalUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/totaluser");
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

  return {TotalUser};
};

export default useTotalUsers;
