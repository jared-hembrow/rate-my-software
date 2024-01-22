'use client'
import axios from 'axios'
import React, { FC, useState } from 'react'
// STYLE
import style from "./UserProfile.module.css"
import UserDetails from './UserDetails'
import UserProjects from './UserProjects'
type Props = {
    user: User
}

const UserProfile: FC<Props> = ({user}) => {
  const [userData, setUserData] = useState<User>(user)


    return (
        <div className={style['profile-container']}>
          <UserDetails name={userData.name || ""} email={userData.email || ""} />
          <UserProjects />
    </div>
  )
}

export default UserProfile