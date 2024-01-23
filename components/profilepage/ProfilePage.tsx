"use client";

import usePreviewImage from "@/hooks/usePreviewImage";
import { Session } from "next-auth";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

interface Props {
  session: Session | null;
}

const ProfilePage = ({ session }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { handleImageChange,selectedFile } = usePreviewImage();
  useEffect(() => {
    const initValues = () => {
      setName(session?.user?.name || "");
      setEmail(session?.user?.email || "");
    };
    initValues();
  }, [session]);

  if(!session){
    redirect("/")
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/profile/${(session?.user as { id: string })?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, selectedFile }),
        }
      );
      
      if (res.ok) {
        toast.success("Updated Successfully");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="shadow-xl w-[500px] mt-4 rounded-md shadow-gray-500 h-[300px] p-2">
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <div className="flex-1 flex items-center mt-4 justify-center flex-col">
            <Image
              alt="image"
              className="w-24 h-24 rounded-full border border-gray-400"
              width={50}
              height={50}
              src={(session?.user?.image || selectedFile)as string}
            />
          <button onClick={() => fileRef.current?.click()}>Change Icon</button>
          <input
            onChange={handleImageChange}
            type="file"
            className="hidden"
            ref={fileRef}
          />
        </div>
        <div className="flex items-center flex-col gap-2 w-full flex-[2]">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id=""
            placeholder="Name..."
            className="w-full border-gray-400 text-black py-2 px-4 outline-none"
          />
          <input
            value={email}
            type="email"
            name="email"
            readOnly
            id=""
            placeholder="Email..."
            className="w-full border-gray-400 text-black py-2 px-4 outline-none"
          />
          <button
            type="submit"
            className="py-2 px-4 rounded-md bg-red-500 text-white w-full"
          >
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
