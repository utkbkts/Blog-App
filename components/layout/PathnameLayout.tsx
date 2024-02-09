"use client"
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../AdminComponent/Sidebar";

const PathnameLayout = ({children}:{children:React.ReactNode}) => {
  const pathname = usePathname();
 
  if (pathname === "/admin" || pathname === "/admin/users" || pathname === "/admin/comments" || pathname === "/admin/blogs") {
    return (
      <div className="flex">
      <Sidebar/>
        {children}
      </div>
    );
  }
  return (
    <div className="lg:max-w-[900px] lg:px-16 mx-auto py-8 shadow-xl dark:shadow-gray-800 min-h-screen flex flex-col px-8">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default PathnameLayout;
