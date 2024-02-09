"use client";
import React, { useEffect, useState } from "react";

const useTotalComment = () => {
  const [totalcomment, settotalComment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/totalcomment");
        if (response.ok) {
          const data = await response.json();
          settotalComment(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return {totalcomment};
};

export default useTotalComment;
