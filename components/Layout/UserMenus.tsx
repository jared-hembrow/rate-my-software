import React, { FC } from 'react'
import clientPromise from '@/DB/mongo'
import { getUser, getUserCollection } from '@/DB/users'
import { Session, getServerSession } from 'next-auth'

type Props = {
    session: Session
}

const UserMenus:FC<Props> = async () => {
    const session = await getServerSession()
    const dbClient = await clientPromise
    if (!session) return null
    const user = await getUser(getUserCollection(dbClient), session.user?.email || "")
    if (!user) return null
    console.log("part user:", user)
  return (
    <>
    
    </>
  )
}

export default UserMenus