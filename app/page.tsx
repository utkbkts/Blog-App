import CategoriesList from "@/components/categories/CategoriesList";
import PostList from "@/components/post/PostList";
import { TPost } from "@/types/CategoryType";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import prisma from "@/libs/prismadb";
import Pagination from "@/components/pagination/Pagination";
interface Props {
  searchParams: { page: string };
}

const fetchData = async (): Promise<TPost[] | null> => {
  const response = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });
  try {
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};
const Home = async ({ searchParams: { page = "1" } }: Props) => {
  const data = await fetchData();
  const session = await getServerSession(authOptions);

  const currentPage = parseInt(page);
  const pageSize = 4;
  const heroItemCount = 1;
  const totalItemCount = await prisma.post.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = data?.slice(startIndex, endIndex);
  return (
    <div>
      <CategoriesList />
      {paginatedProducts && paginatedProducts.length > 0 ? (
        paginatedProducts.map((post) => (
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
      {totalPages && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default Home;
