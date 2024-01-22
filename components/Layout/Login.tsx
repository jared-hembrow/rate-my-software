'use client'

import React, { FC } from 'react'
import {signIn, signOut } from "next-auth/react"
type Props = {
    loggedIn: boolean
}


const Login: FC<Props> = ({loggedIn}) => {

    // const signIn = () => {
    //     console.log("login")
    //   }
    // const signOut = () => {
    //     console.log("logout")
    //   }
      
    
    if (loggedIn) {
      return <button className='btn btn-danger' onClick={() => signOut()}>Sign out</button>
    }
    if (!loggedIn) {
        return <button className='btn btn-primary' onClick={() => signIn()}>Sign in</button>
    }
  return (
    <div>Login</div>
  )
}

export default Login