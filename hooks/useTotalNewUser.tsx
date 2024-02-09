"use client"
import React, { useEffect, useState } from 'react'

const useTotalNewUser = () => {
    const [totalNewUser,setTotalNewUser]=useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("/api/admin/totalnewuser");
            if (response.ok) {
              const data = await response.json();
              setTotalNewUser(data);
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

      return{totalNewUser}
}

export default useTotalNewUser
