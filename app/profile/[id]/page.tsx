import ProfilePage from '@/components/profilepage/ProfilePage'
import { authOptions } from '@/libs/AuthOptions'
import { getServerSession } from 'next-auth'
import React from 'react'
const Profile =async () => {
    const session = await getServerSession(authOptions)
    
  return (
    <div className='flex items-center justify-center h-full'>
     <ProfilePage session={session}/> 
    </div>
  )
}

export default Profile
