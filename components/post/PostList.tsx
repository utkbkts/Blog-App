"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteButton from "../deletepost/DeleteButton";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { FaRegCommentAlt } from "react-icons/fa";

interface PostProps {
  id: string;
  author: string;
  date: string;
  thumbnail?: string;
  authorEmail?: string;
  title: string;
  content: string;
  links?: string[];
  category?: string;
  session: Session | null;
  post:any | null
}

const PostList = async ({
  id,
  author,
  date,
  thumbnail,
  authorEmail,
  title,
  content,
  links,
  category,
  session,
  post
}: PostProps) => {
  const isEditable = session && session?.user?.email === authorEmail;
  const dateObject = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const router = useRouter();
  
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return (
    <div className="border-t border-t-gray-400 p-2 ">
      <div>
        <span className="font-bold text-4xl uppercase">{title}</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="">
          {author ? (
            <>
              Posted by: <span className="font-bold">{author}</span> on{" "}
              {formattedDate}
            </>
          ) : (
            <>Posted on {formattedDate}</>
          )}
        </div>
        <div>
          <button
            onClick={() => router.push(`/detail/${id}`)}
            className="py-2 bg-black text-white rounded-md px-4 cursor-pointer"
          >
            Detail
          </button>
        </div>
      </div>
      <div className="w-full h-72 relative">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover rounded-md object-center"
          />
        ) : (
          <Image
            src={"/user.png"}
            alt={title}
            fill
            className="object-cover rounded-md object-center"
          />
        )}
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <span className="px-4 py-1 flex items-center justify-center rounded-md bg-slate-800 text-white cursor-pointer w-1/4">
          {category && <Link href={`/categories/${category}`}>{category}</Link>}
        </span>
        <span className="text-gray-800 font-semibold dark:text-white">
          {content}
        </span>
        {links && (
          <div className="my-4 flex flex-col gap-3">
            {links.map((link, i) => (
              <div key={i} className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>

                <Link className="link" href={link}>
                  {link}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
     <div className="flex items-center gap-4">
     <span className="relative">
        <FaRegCommentAlt />
     {post && post?.Comment?.length > 0 ? (   <span className="absolute flex items-center justify-center top-[-12px] right-[-10px] bg-black dark:bg-white text-white dark:text-black font-bold w-[16px] h-[16px] rounded-full">{post.Comment.length}</span>):("")}
      </span>
      {isEditable && (
        <div className="flex items-center gap-2">
          <div className="py-2 px-4 rounded-md bg-zinc-400 text-black">
            <Link href={`/edit-post/${id}`}>Edit</Link>
          </div>
          <div className="py-2 px-4 rounded-md bg-red-400 text-black">
            <DeleteButton id={id} />
          </div>
        </div>
      )}
     </div>
    </div>
  );
};

export default PostList;
