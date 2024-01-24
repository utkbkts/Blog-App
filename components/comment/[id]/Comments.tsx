"use client"
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DeleteComment from "../../deletecomment/DeleteComment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const Comments =  ({ postId }:any) => {
  const [comments, setComments] = useState([]);
  const {data:session}=useSession()
  const router = useRouter()
  useEffect(() => {
    
    const fetchComments = async () => {
      const response = await fetch(`/api/comment/${postId}`);
      if (response.ok) {
        const data = await response.json();
        router.refresh()
        setComments(data);
      }
    };

    fetchComments();
  }, [postId]);
  
  return (
    <div className="w-full h-[400px] overflow-y-scroll p-2">
      <div className="flex flex-col gap-4">
        {comments &&
          comments.map((item: any) => (
            <div key={item.id} className="flex gap-2 bg-gray-400 p-1">
              <div className="flex-1">
                <Image
                  className="w-12 h-12 rounded-full border-white "
                  src={"/user.png"}
                  alt="image"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col flex-[5]">
                <span className="dark:text-white text-black font-bold text-xl">
                  {item.user.name}
                </span>
                <span className="text-gray-300 font-light dark:text-white flex gap-4">
                  {moment(item.createdAt).format("L")}
                  <span>
                    {moment(item.createdAt).startOf("hour").fromNow()}
                  </span>
                </span>
                <span>{item.body}</span>
              </div>
              {session && session?.user?.name === item.user.name && (
                <div>
                  <DeleteComment id={item.id} />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
