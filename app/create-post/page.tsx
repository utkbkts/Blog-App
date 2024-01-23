import CreatePostList from '@/components/CreatePostList/CreatePostList'
import { getServerSession } from 'next-auth/next'
import React from 'react'
import { redirect } from 'next/navigation'
import { authOptions } from '@/libs/AuthOptions'
export const metadata={
    title:"Create Post"
}

const CreatePost = async() => {
  const session = await getServerSession(authOptions)
  if(!session){
    redirect("/sign-in")
  }
  return (
    <div>
      <CreatePostList/>
    </div>
  )
}

export default CreatePost
