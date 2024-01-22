import clientPromise from '@/DB/mongo'
import { getUser, getUserCollection } from '@/DB/users'
import UserProfile from '@/components/User/UserProfile'
import { getServerSession } from 'next-auth'
import React from 'react'

type Props = {}

const page = async (props: Props) => {
  const session = await getServerSession()
  if (!session) return null
  if (!session.hasOwnProperty("user")) return null

  const dbClient = await clientPromise
  // console.log("CLient",dbClient)
  const user = await getUser(getUserCollection(dbClient), session.user?.email || "")
  console.log("retrived user", user)
  if (!user) return <div>
    i lost i dont have a user 
  </div>


  return (
    <div className='container p-3'>
        <UserProfile user={{...user, _id: user._id.toString()} as User}  />
    </div>
  )
}
export default page