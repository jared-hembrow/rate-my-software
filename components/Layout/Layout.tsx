import React, { FC, ReactNode } from 'react'
import Navbar from './Navbar'

type Props = {
    children: ReactNode
}

const Layout: FC<Props> = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}

export default Layout