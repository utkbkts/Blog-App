"use client"
import Image from "next/image";
import React from "react";
import image1 from "@/public/icons8-google-144.png"
import image2 from "@/public/icons8-github-150.png"
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const SignIn = () => {
  const {data:session}=useSession()
    if(session){
      redirect("/")
    }
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <div>
        <h1 className="text-center font-bold text-4xl">Sign In</h1>
      </div>
      <div className="flex items-center flex-col gap-4 h-full">
      <div onClick={()=>signIn("google")} className="flex items-center gap-2 border border-gray-300 rounded-md p-2 cursor-pointer">
        <Image
          src={image1}
          alt="image"
          width={200}
          height={200}
          className="w-6 h-6"
        />
        <span>Sign In with Google</span>
      </div>
      <div onClick={()=>signIn("github")} className="flex items-center gap-2 border border-gray-300 rounded-md p-2 cursor-pointer">
        <Image
          src={image2}
          alt="image"
          width={200}
          height={200}
          className="w-6 h-6"
        />
        <span>Sign In with Github</span>
      </div>
      </div>
    </div>
  );
};

export default SignIn;
