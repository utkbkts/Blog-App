import PostList from "@/components/post/PostList";
import { authOptions } from "@/libs/AuthOptions";
import { TPost } from "@/types/CategoryType";
import { getServerSession } from "next-auth";
import React from "react";

const fetchdata = async (catName: string): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${catName}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const categories = await res.json();
      const posts = categories.posts;
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const CategoriesDetail = async ({
  params,
}: {
  params: { catName: string };
}) => {
  const session = await getServerSession(authOptions)
  const category = params.catName;
  const posts = await fetchdata(category);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 underline">
        <span>Category:</span>
        {decodeURIComponent(category)}
      </h1>
      {posts && posts.length > 0 ? (
        posts.map((post:TPost) => (
          <PostList
          key={post.id}
          id={post.id}
          author={post.author.name}
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
        <h1>No Posts to display</h1>
      )}
    </div>
  );
};

export default CategoriesDetail;
