"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Comment = ({ postId }: { postId: string }) => {
    const [comment, setComment] = useState('');
    const { data: session } = useSession();
    const router = useRouter();
    
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!session) {
          // Handle not authenticated
          return;
        }
    
        const response = await fetch('/api/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ body: comment, postId }),
        });
    
        if (response.ok) {
          router.refresh();
        } else {
        }
      };
    
  return (
    <div>
    <h2 className='text-center text-black dark:text-white pb-4 pt-4 text-4xl font-bold tracking-wider'>Comments</h2>
    {session && (
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your comment"
          className='w-full h-[250px] resize-none text-black py-2 px-4 outline-none focus:border-blue-400 focus:border'
        />
        <button type="submit" className='py-2 px-4 w-full text-white bg-gray-900 hover:bg-gray-500 transition-all duration-300'>Add Comment</button>
      </form>
    )}
  </div>
  )
}

export default Comment
