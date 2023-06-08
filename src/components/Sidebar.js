import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import logo from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home2 } from 'iconsax-react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import Swal from 'sweetalert2'
const apiUrl = "https://vunafind.onrender.com";

function Sidebar() {
    function sidebarStyle({isActive}){
        return{
         backgroundColor: isActive? 'rgba(0, 128, 0, 0.2)':'',
         color: isActive? 'rgba(30, 82, 62, 1)':''
        }
     }
     const authCtx = useContext(AuthContext);
  const [user, setUser] = useState({})
  const [isLoggin,setIsLoggin] = useState(false)
  function loadingMessage(title, text) {
    let timerInterval;
    Swal.fire({
      title: title,
      text: text,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {}, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  }
  function popUpMessage(icon, color, title, text, timer) {
    Swal.fire({
      icon: icon,
      color: color,
      title: title,
      text: text,
      timer: timer,
      showConfirmButton: false,
    });
}
const navigate = useNavigate();

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

  async function handleLogout(){
    setIsLoggin(true)
    try {
        await axios.post(`${apiUrl}/api/v1/auth/logout`,{}, {
            headers: {
                'Authorization':`Bearer ${authCtx.userToken}`
            }
        })
        authCtx.clearUserData()
        popUpMessage(
            "success",
            "green",
            "Logged Out!",
            "",
            5000
          );
        navigate('/')
    } catch (error) {
    setIsLoggin(false)
        console.log(error)
    }
    setIsLoggin(false)
}

    if(isLoggin){
        loadingMessage(
            "Logging User out!",
            // "Please wait while we verify your details"
          );
    }



  return (
    <div className='sidebar-container'>
        <div>
        <div className='sidebar-img-container'>
            <img src={logo} alt='logo' />
        </div>
        <div className='sidebar-list-container'>
          {user && user.role === 'Student' && (
            <ul>
                <li>
                    <NavLink to={'/student/dashboard'} style={sidebarStyle}>
                        <Home2 className='icon'/>
                        <span>Hostels</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/student/get-room'} style={sidebarStyle}>
                        <Home2 className='icon'/>
                        <span>Get Room</span>
                    </NavLink>
                </li>
            </ul>
          )}
          {user && user.role === 'Admin' && (
            <ul>
                <li>
                    <NavLink to={'/admin/dashboard'} style={sidebarStyle}>
                        <Home2 className='icon'/>
                        <span>Hostels</span>
                    </NavLink>

                </li>
            </ul>
          )}
        </div>
        </div>

          <div style={{width:150, display: 'block', marginTop:15, marginBottom:15}}>
            <button onClick={handleLogout} style={{width: '100%', padding:10, borderRadius:20, border: 'none', backgroundColor:'red', color:'white', fontSize:19}}>Log out</button>
          </div>
    </div>
  )
}

export default Sidebar
