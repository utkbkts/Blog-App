"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ThemeToggle from "../themetoggle/ThemeToggle";

const Navbar = () => {
  const { status, data: session } = useSession();
  const [isPopupVisible, setisPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setisPopupVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    if (!isPopupVisible) {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupVisible]);
  
  return (
    <div className="flex justify-between pb-4 border-b mb-4">
      <div>
        <Link href={"/"}>
          <h1 className="text-4xl text-dark font-bold tracking-tighter dark:text-white">
            Tech New
          </h1>
        </Link>
        <p>
          Exploring Tomorrow's Innovations. <br />
          One Byte at a Time
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <ThemeToggle/>
        </div>
        {status === "authenticated" ? (
          <div ref={popupRef} className="flex items-center gap-4 relative">
            <Link
              href={"/create-post"}
              className="md:flex hidden items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>Create New</span>
            </Link>
            <span
              onClick={() => setisPopupVisible(!isPopupVisible)}
              className="bg-purple-700 w-12 h-12 flex items-center justify-center text-4xl text-white font-bold rounded-full cursor-pointer"
            >
              {session.user?.name?.charAt(0)}
            </span>
            {isPopupVisible && (
              <div  className="w-[200px] bg-zinc-100 p-2 dark:bg-white dark:text-black z-50 h-auto top-12 right-0 rounded-md absolute flex items-center justify-between flex-col">
                <div className="flex flex-col items-center justify-center gap-3">
                  <span className="font-bold text-md">
                    {session.user?.name}
                  </span>
                  <span>{session.user?.email}</span>
                  <Link onClick={() => setisPopupVisible(!isPopupVisible)} href={"/dashboard"}>Dashboard</Link>
                  <Link onClick={() => setisPopupVisible(!isPopupVisible)} href={"/create-post"}>Create Post</Link>
                  <Link onClick={() => setisPopupVisible(!isPopupVisible)} href={`/profile/${(session?.user as { id: string })?.id}`}>Profile</Link>
                </div>
                <span className="btn cursor-pointer mt-4" onClick={() => signOut()}>
                  Sign Out
                </span>
              </div>
            )}
          </div>
        ) : (
          <Link className="btn dark:text-black" href={"/sign-in"}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
