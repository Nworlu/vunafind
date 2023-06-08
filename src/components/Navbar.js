import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import {Notification, SearchNormal1} from 'iconsax-react'
import userPic from '../assets/user.png'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
const apiUrl = "https://vunafind.onrender.com";


function Navbar() {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState({})
  useEffect(()=>{
    async function getUser(){
      const response = await axios.get(`${apiUrl}/api/v1/user/profile/${authCtx.userInfo._id}`,{
        headers:{
          Authorization: `Bearer ${authCtx.userToken}`
        }
      })
      console.log(response.data.data)
      setUser(response.data.data)
    }
    getUser()
  },[])
  return (
    <div className='navbar-container'>
        <div className='navbar-search'>
            <input type='text' placeholder='Search'/>
            <SearchNormal1 className='icon'/>
        </div>
        <div className='navbar-righty'>
            <Notification className='icon'/>
            {user.role === 'Admin' &&
            <Link to={`/admin/getprofile/${authCtx.userInfo._id}`} className='navbar-img-container'>
                <img src={userPic} alt='user-profile-pic'/>
            </Link>
            }
            {user.role === 'Student' &&
            <Link to={`/student/getprofile/${authCtx.userInfo._id}`} className='navbar-img-container'>
                <img src={userPic} alt='user-profile-pic'/>
            </Link>
            }
        </div>
    </div>
  )
}

export default Navbar
