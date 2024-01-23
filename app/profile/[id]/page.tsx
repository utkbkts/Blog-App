import ProfilePage from '@/components/profilepage/ProfilePage'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../api/auth/[...nextauth]/route'
const Profile =async () => {
    const session = await getServerSession(authOptions)
    
  return (
    <div className='flex items-center justify-center h-full'>
     <ProfilePage session={session}/> 
    </div>
  )
}

export default Profile
