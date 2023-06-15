import React, { useContext, useState } from 'react'
import './AdminLoginPage.css'
import AuthBackgroundImage from '../../components/AuthBackgroundImage'
import AuthCard from '../../components/AuthCard'
import PrimaryButton from '../../components/PrimaryButton'
import Title from '../../components/Title'
import { AuthContext } from '../../context/AuthContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const apiUrl = 'https://vunafind.onrender.com'

function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredEmail, setEnteredEmail] = useState('')
  const [isLoggin, setIsLoggin] = useState(false)
  const authCtx = useContext(AuthContext)

  function popUpMessage(icon, color, title, text, timer) {
    Swal.fire({
      icon: icon,
      color: color,
      title: title,
      text: text,
      timer: timer,
      showConfirmButton: false,
    })
  }
  function loadingMessage(title, text) {
    let timerInterval
    Swal.fire({
      title: title,
      text: text,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {}, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }
  const navigate = useNavigate()

  function inputValidation(error) {
    let email = enteredEmail.includes('@')
    let password = enteredPassword.length > 6
    popUpMessage(
      'error',
      'red',
      'Failed Authentication!',
      error
        ? error
        : !email
        ? 'Please provide a vaild matric number'
        : !password
        ? 'Please your password must be 6'
        : '',
      5000
    )
  }
  const data = {
    email: enteredEmail,
    password: enteredPassword,
  }
  async function onSubmitHandler(e) {
    e.preventDefault()
    setIsLoggin(true)
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/auth/adminlogin`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://vunafind.onrender.com', // replace with your own domain
          },
          mode: 'cors',
          credentials: 'include',
        }
      )
      authCtx.setUserData(response.data.data.user)
      authCtx.setUserTokenData(response.data.token)
      popUpMessage(
        'success',
        'green',
        'Successful Authentication!',
        'Welcome Back',
        5000
      )
      console.log(response)
      navigate('/admin/dashboard')
      if (response.data.data.user.isActive === false) {
        navigate('/otp-verify')
      } else if (response.data.data.user.isActive === true) {
        navigate('/admin/dashboard')
      } else if (response.data.data.user.role !== 'Admin') {
        alert("You don't have permission to access this route.")
      }
    } catch (error) {
      inputValidation(error.response.data.message || error.response.data.error)
      // console.log(error.response.data.message)
      // console.log(error.response.data.error)
    }
    setIsLoggin(false)
  }

  if (isLoggin) {
    loadingMessage(
      'Authenticating User!',
      'Please wait while we verify your details'
    )
  }

  const viewPasswordHandler = () => {
    setShowPassword(!showPassword)
  }

  return (
    <AuthBackgroundImage>
      <AuthCard>
        <Title style={{ marginTop: 78, textTransform: 'uppercase' }}>
          <span style={{ color: '#1E523E' }}>Admin</span> Login
        </Title>
        <form
          className='admin-login-container'
          autoComplete='off'
          onSubmit={onSubmitHandler}
        >
          <div className='email-holder'>
            <label>Veritas Email</label>
            <input
              type={'email'}
              onChange={(e) => setEnteredEmail(e.target.value)}
              value={enteredEmail}
              placeholder='Enter your veritas given email'
              autoComplete='new-password'
            />
          </div>
          <div className='password-holder'>
            <label>Password</label>
            <input
              type={'password'}
              onChange={(e) => setEnteredPassword(e.target.value)}
              value={enteredPassword}
              placeholder='Enter your Password'
              autoComplete='new-password'
            />
          </div>
          <div style={{ width: '150px' }}>
            <PrimaryButton type={'submit'}>Login</PrimaryButton>
          </div>
        </form>
      </AuthCard>
    </AuthBackgroundImage>
  )
}

export default AdminLoginPage
