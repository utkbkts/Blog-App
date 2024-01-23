import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import EditListPost from '@/components/editpost/EditListPost';
import { TPost } from '@/types/CategoryType';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const getPosts = async (id:string): Promise<TPost[] | null> => {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
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

const EditPost =async ({params}:{params:{id:string}}) => {
    const session = await getServerSession(authOptions)
    if(!session){
        redirect("/")
    }
    const id = params.id
    const post = await getPosts(id)
  return (
    <>
      {post ? <><EditListPost post={post}/></>:<h1>Invalid Post</h1>}
    </>
  )
}

export default EditPost
