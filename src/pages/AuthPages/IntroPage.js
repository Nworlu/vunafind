import React, { useEffect } from 'react'
import AuthBackgroundImage from '../../components/AuthBackgroundImage'
import AuthCard from '../../components/AuthCard'
import FlatButton from '../../components/FlatButton'
import PrimaryButton from '../../components/PrimaryButton'
import SubTitle from '../../components/SubTitle'
import Title from '../../components/Title'
import './IntroPage.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
const apiUrl = 'https://vunafind.onrender.com'

function IntroPage() {
  let navigate = useNavigate()
  useEffect(() => {
    async function ping() {
      try {
        const repsonse = await axios.get(`${apiUrl}`)
        console.log(repsonse)
      } catch (error) {
        console.log(error)
      }
    }
    ping()
  },[])
  return (
    // <div className='intropage-container'>
    <AuthBackgroundImage>
    <AuthCard>
      <div style={{textAlign: 'center'}}>
      <Title>Welcome to <span style={{color:'#1E523E'}}>VunaFind</span></Title>
      <SubTitle>
      Find the perfect hostel and roommate of your desire
      </SubTitle>
      </div>
      <div className='intro-buttons'>
        <PrimaryButton onClick={()=>navigate('/admin/login')} style={{width:'100%'}}>
          Admin Login
        </PrimaryButton>
        <FlatButton onClick={()=>navigate('/student/login')} style={{marginTop: 30, width:'100%'}}>
          Student Login
        </FlatButton>
        <div className='nav-buttons'>
        {/* <NavLink to='/admin/signup'>
            Admin Sign up
        </NavLink> */}
        <NavLink to='/student/signup'>
            New User?
        </NavLink>
        </div>
      </div>
    </AuthCard>
    </AuthBackgroundImage>
    // </div>
  )
}

export default IntroPage

// {/* <div className='intropage-div'>
// <div className='intropage-div-header'>
//   <Title>Welcome to <span>VunaFind</span></Title>
//   {/* <h1>Welcome to <span>VunaFind</span></h1> */}
//   <p>Find the perfect hostel and roommate of your desire </p>
// </div>
// <div style={{width: '500px'}}>
//   <PrimaryButton style={{width:'100%'}}>
//     Admin Login
//   </PrimaryButton>
//   <FlatButton style={{marginTop: 30, width:'100%'}}>
//     Student Login
//   </FlatButton>
// </div>
// </div> */}
