import DeleteButton from "@/components/deletepost/DeleteButton";
import { authOptions } from "@/libs/AuthOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const fetchdata = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
  return null;
};

const DetailByID = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const posts = await fetchdata(id);
  const session = await getServerSession(authOptions);

  const isEditable = session && session?.user?.email === posts.authorEmail;

  const dateObject = new Date(posts.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return (
    <div>
      <div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{posts.title}</h1>
        </div>
        <div className="mb-4">
          {posts.author ? (
            <>
              Posted by: <span className="font-bold">{posts.author.name}</span>{" "}
              on {formattedDate}
            </>
          ) : (
            <>Posted on {formattedDate}</>
          )}
        </div>
        <div className="w-full h-[400px] relative mb-5">
          <Image
            fill
            alt="image"
            src={posts.imageUrl}
            className="object-cover"
          />
        </div>
      </div>
      <div>
        <span className="px-4 py-1 flex items-center justify-center rounded-md bg-slate-800 text-white cursor-pointer w-1/4">
          {posts.catName && (
            <Link href={`/categories/${posts.catName}`}>{posts.catName}</Link>
          )}
        </span>
        <span className="text-gray-800 font-semibold mb-4 mt-4 dark:text-white">{posts.content}</span>
        {posts.links && (
          <div className="my-4 flex flex-col gap-3">
            {posts.links.map((link:any, i:any) => (
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
      <div>
      {isEditable && (
        <div className="flex items-center gap-2">
          <div className="py-2 px-4 rounded-md bg-zinc-400 text-black">
            <Link href={`/edit-post/${posts.id}`}>Edit</Link>
          </div>
          <div className="py-2 px-4 rounded-md bg-red-400 text-black">
            <DeleteButton id={posts.id} />
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default DetailByID;
