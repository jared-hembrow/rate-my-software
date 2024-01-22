
import { getServerSession } from 'next-auth'
import React from 'react'
import Login from './Login'
import UserMenus from './UserMenus'

type Props = {}

const Navbar = async () => {
    const session = await getServerSession()
    
    const renderLogBtn = () => {
    if (session) return  <Login loggedIn />
    return  <Login loggedIn={false} />
    }
    const renderUserMenus = () => {
      if (session) {
        return <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/profile">Profile</a>
        </li>
                 
            {!session ? null : <UserMenus session={session} />}
      </ul>
      }
      else return null
    }
  return (
    <nav className={`navbar navbar-expand-lg bg-body-tertiary`} style={{backgroundColor: "var(--blue-gray)"}}>
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Rate My Software</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
       {renderUserMenus()}
        <div className="d-flex">
        {renderLogBtn()}
        
        </div> 
      </div>
    </div>
  </nav>
  )
}

export default Navbar