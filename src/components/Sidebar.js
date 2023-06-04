import React from 'react'
import './Sidebar.css'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { Home2 } from 'iconsax-react'

function Sidebar() {
    function sidebarStyle({isActive}){
        return{
         backgroundColor: isActive? 'rgba(0, 128, 0, 0.2)':'',
         color: isActive? 'rgba(30, 82, 62, 1)':''
        }
     }
  return (
    <div className='sidebar-container'>
        <div className='sidebar-img-container'>
            <img src={logo} alt='logo' />
        </div>
        <div className='sidebar-list-container'>
            <ul>
                <li>
                    <NavLink to={'/admin/dashboard'} style={sidebarStyle}>
                        <Home2 className='icon'/>
                        <span>Hostels</span>
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink to={'/admin/profile'} style={sidebarStyle}>
                        <Home2 className='icon'/>
                        <span>Profile</span>
                    </NavLink>
                </li> */}
            </ul>
        </div>
    </div>
  )
}

export default Sidebar
