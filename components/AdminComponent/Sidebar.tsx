"use client";
import React, { useContext, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { FaArrowLeft, FaBlog, FaMicroblog, FaUser } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const pathname = usePathname();
  const toggleSidebar = () => {
    setActiveSidebar(!activeSidebar);
  };


  return (
    <div
      className={`h-screen relative transition-all duration-300 border-r bg-darkbg text-white ${
        activeSidebar ? "w-24 " : " w-1/5"
      }`}
    >
      <div
        onClick={toggleSidebar}
        className="absolute right-0 p-2 top-0 cursor-pointer"
      >
        {activeSidebar ? <FaArrowLeft size={25} /> : <FaArrowRight size={25} />}
      </div>
      <div className={`flex flex-col pt-4`}>
        <div
          className={`flex items-center justify-center flex-col gap-2 border-b ${
            activeSidebar ? "mt-10" : ""
          }`}
        >
          <img
            src=""
            className="rounded-full w-14 h-14 border border-gray-300"
            alt=""
          />
          <span className={`${activeSidebar ? "text-center" : ""}`}>
            utku bektasoglu
          </span>
          <span className={`${activeSidebar ? "opacity-0" : "opacity-100"}`}>
            utku@gmail.com
          </span>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <Link href={"/admin"}
            className={`flex items-center flex-col  cursor-pointer hover:bg-gray-300 transition-all hover:text-white py-2 px-4 rounded-md gap-2 ${
               pathname === "/admin" ? "bg-gray-400 text-white" : ""
            }`}
          >
            <span>
              <MdDashboard />
            </span>
            <span className={`${activeSidebar ? "hidden" : "block"}`}>
              Dashboard
            </span>
          </Link>
          <Link href={"/admin/users"}
            className={`flex items-center flex-col  cursor-pointer hover:bg-gray-300 transition-all hover:text-white py-2 px-4 rounded-md gap-2 ${
              pathname === "/admin/users" ? "bg-gray-400 text-white" : ""
            }`}
          >
            <span>
              <FaUser />
            </span>
            <span className={`${activeSidebar ? "hidden" : "block"}`}>
              User's
            </span>
          </Link>
          <Link href={"/admin/comments"}
            className={`flex items-center flex-col  cursor-pointer hover:bg-gray-300 transition-all hover:text-white py-2 px-4 rounded-md gap-2 ${
              pathname === "/admin/comments" ? "bg-gray-400 text-white" : ""
            }`}
          >
            <span>
              <FaComment />
            </span>
            <span className={`${activeSidebar ? "hidden" : "block"}`}>
              Comment's
            </span>
          </Link>
          <Link href={"/admin/blogs"}
            className={`flex items-center flex-col  cursor-pointer hover:bg-gray-300 transition-all hover:text-white py-2 px-4 rounded-md gap-2 ${
              pathname === "/admin/blogs" ? "bg-gray-400 text-white" : ""
            }`}
          >
            <span>
              <FaBlog />
            </span>
            <span className={`${activeSidebar ? "hidden" : "block"}`}>
              Blog's
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
