import React, { FC, useState } from 'react'
// STYLE
import style from "./UserProfile.module.css"
type Props = {
    name: string
    email: string
}
type SubmissionTypes = "emailEditSubmit" | "nameEditSubmit"
type IconTypes = SubmissionTypes | "nameEdit" | "emailEdit" | "nameEditCancel" | "emailEditCancel" 
const UserDetails: FC<Props> = ({name, email}) => {
    const [userName,setUserName] = useState<string>(name)
    const [userEmail, setUserEmail] = useState<string>(email)
    const [editUserName,setEditUserName] = useState<boolean>(false)
    const [editUserEmail, setEditUserEmail] = useState<boolean>(false)

    const onNameEditIconClick = () => {
        console.log("edit name icon click ")
        setEditUserName(!editUserName)
    }
    const onSubmit = (submitType: SubmissionTypes) => {
        if (submitType === "nameEditSubmit" ){}
        if (submitType === "emailEditSubmit" ){}
        console.log("user name submit")
    }
    const onIconClick = (iconType: IconTypes) => {
        if (iconType.includes("Submit")) return onSubmit(iconType as SubmissionTypes)
        switch (iconType) {
            case "nameEdit":
                setEditUserName(!editUserName)
                return
            case "emailEdit":
                setEditUserEmail(!editUserEmail)
                return 
            case "nameEditCancel":
                setEditUserName(false)
                setUserName(name)
                return
            case "emailEditCancel":
                setEditUserEmail(false)
                setUserEmail(name)
                return
            default:
                return
        }
    }


  return (<>
         {/* Main Details */}
         <div className={"row"}>

         <div className='col'>
           <div className={"row"}>
     <div className="col">
           <span className={style['text-label']}>
           Name:
           </span>
     
     </div>
     <div className="col">
            {!editUserName ? userName || "" : <>
            <input type="text" value={userName} onChange={(e) => {
                setUserName(e.target.value)
            }} className="form-control"
            onKeyDown={(e) => {if (e.key === "Enter") onIconClick("nameEditSubmit")}}
            />
            </>}
     </div>
     <div className="col">
     {!editUserName ? <i onClick={onNameEditIconClick} style={{color: "white",fontSize: "1.5rem"}} className={`bi bi-pencil-square ${style['action-hover']}`}></i>
      : <div >
      <i onClick={() => onIconClick("nameEditSubmit")}  style={{color: "greenyellow", marginRight: "20px", fontSize: "1.5rem"}} className={`bi bi-check-square ${style['action-hover']}`} ></i> 
      <i onClick={() => onIconClick("nameEditCancel")} style={{color: "red", fontSize: "1.5rem"}} className={`bi bi-x-square ${style['action-hover']}`} ></i> 
      </div>
      }
         
     </div>
       
           </div>
       
       <div className={"row"}>
         <div className='col'>
       <div className={"row"}>

     <div className="col">
           <span className={style['text-label']}>
           Email:
           </span>
     </div>
     <div className="col">
         {userEmail}
         
     </div>
     <div className="col">
         <i style={{color: "white"}} className={`bi bi-pencil-square ${style['action-hover']}`}></i>
     </div>
         </div></div>
         </div>
       </div>



   </div>
   </>)
}

export default UserDetails