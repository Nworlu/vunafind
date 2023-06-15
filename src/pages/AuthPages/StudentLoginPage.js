import React, { useContext, useEffect, useState } from 'react'
import { EyeSlash, Eye } from 'iconsax-react'
import './StudentLoginPage.css'
import AuthBackgroundImage from '../../components/AuthBackgroundImage'
import AuthCard from '../../components/AuthCard'
import PrimaryButton from '../../components/PrimaryButton'
import Title from '../../components/Title'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const apiUrl = 'https://vunafind.onrender.com'
function StudentLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredEmail, setEnteredEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoggin, setIsLoggin] = useState(false)
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    async function ping() {
      try {
        const response = await axios.get(`${apiUrl}`)
        console.log(response)
      } catch (error) {
        console.log(error.message)
        setErrorMessage(error.message)
      }
    }
    ping()
  },[])

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
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }
  const navigate = useNavigate()

  function inputValidation(error) {
    let password = enteredPassword.length > 6
    let email = enteredEmail.includes('@')
    popUpMessage(
      'error',
      'red',
      'Failed Authentication!',
      error
        ? error
        : !email
        ? 'Please provide a vaild matric number'
        : !password? 'Please your password must be 6' :'',
      5000
    )
  }
  const data = {
    password: enteredPassword,
    email: enteredEmail,
  }


  async function onSubmitHandler(e) {
    e.preventDefault()
    setIsLoggin(true)
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/auth/login`,
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
    setIsLoggin(false)

      console.log(response)
      if (response.data.data.user) {
        navigate('/student/dashboard')
      }
    } catch (error) {
      if (error.message === 'Network Error') {
        // Display specific network error message
        popUpMessage(
          'error',
          'red',
          'Network Error',
          'Please check your internet connection',
          5000
        )
      } else {
        // Display generic error message
        inputValidation(
          error.response.data.message || error.response.data.error
        )
      }
      console.log(error.response.data.message || error.response.data.error)
      setIsLoggin(false)
    }
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
          <span style={{ color: '#1E523E' }}>Student</span> Login
        </Title>
        <form
          className='student-login-container'
          onSubmit={onSubmitHandler}
          autoComplete='off'
        >
          <div className='email-holder'>
            <label>Your Email</label>
            <input
              type={'text'}
              autoComplete='new-password'
              onChange={(e) => setEnteredEmail(e.target.value)}
              placeholder='Enter your Email'
            />
          </div>
          <div className='password-holder'>
            <label>Password</label>
            <input
              type={showPassword?'text':'password'}
              autoComplete='new-password'
              onChange={(e) => setEnteredPassword(e.target.value)}
              placeholder='Enter your Password'
            />
            <button
              type='button'
              className='show-password'
              onClick={viewPasswordHandler}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </button>
          </div>
          <div style={{ width: '150px' }}>
            <PrimaryButton>Login</PrimaryButton>
          </div>
        </form>
      </AuthCard>
    </AuthBackgroundImage>
  )
}

export default StudentLoginPage
