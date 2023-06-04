import React from 'react'
import './StudentLoginPage.css'
import AuthBackgroundImage from '../../components/AuthBackgroundImage'
import AuthCard from '../../components/AuthCard'
import PrimaryButton from '../../components/PrimaryButton'
import Title from '../../components/Title'

function StudentLoginPage() {
  return (
    <AuthBackgroundImage>
        <AuthCard>
        <Title style={{marginTop:28}}><span style={{color:'#1E523E'}}>Student</span> Login</Title>
        <form className='student-login-container'>
            <div className='email-holder'>
            <label>Veritas Email</label>
            <input type={'email'} placeholder="Enter your veritas given email"/>
            </div>
            <div className='password-holder'>
            <label>Password</label>
            <input type={'email'} placeholder="Enter your valid Password"/>
            </div>
            <div style={{width:'150px'}}>
                <PrimaryButton>
                    Login
                </PrimaryButton>

            </div>
        </form>
        </AuthCard>
    </AuthBackgroundImage>
  )
}

export default StudentLoginPage