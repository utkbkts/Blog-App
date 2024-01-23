import PostList from "@/components/post/PostList";
import { TPost } from "@/types/CategoryType";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { authOptions } from "@/libs/AuthOptions";

export const metadata = {
  title: "Dashboard",
};

const getPosts = async (email: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/authors/${email}`);
    const { posts } = await res.json();
    return posts;
  } catch (error) {
    return null;
  }
};

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let posts = [];

  if (!session) {
    redirect("/sign-in");
  }

  if (email) {
    posts = await getPosts(email);
  }

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold border-b dark:text-white">My Posts</h1>
      </div>
      {posts && posts.length > 0 ? (
        posts.map((post:TPost) => (
          <PostList
            key={post.id}
            id={post.id}
            author={""}
            authorEmail={post.authorEmail}
            date={post.createdAt}
            thumbnail={post.imageUrl}
            category={post.catName}
            title={post.title}
            content={post.content}
            links={post.links || []}
            session={session}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center dark:text-white">
          <h1 className="text-2xl font-bold">No Posts Created Yet</h1>
          <Link
            className="text-2xl font-bold underline cursor-pointer"
            href={"/create-post"}
          >
            Create New
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
