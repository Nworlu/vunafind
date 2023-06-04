import React from 'react'
import './Navbar.css'
import {Notification, SearchNormal1} from 'iconsax-react'
import userPic from '../assets/user.png'
 
function Navbar() {
  return (
    <div className='navbar-container'>
        <div className='navbar-search'>
            <input type='text' placeholder='Search'/>
            <SearchNormal1 className='icon'/>
        </div>
        <div className='navbar-righty'>
            <Notification className='icon'/>
            <div className='navbar-img-container'>
                <img src={userPic} alt='user-profile-pic'/>
            </div>
        </div>
    </div>
  )
}

export default Navbar