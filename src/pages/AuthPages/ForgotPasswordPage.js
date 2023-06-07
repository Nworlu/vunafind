import React, { useContext, useState } from 'react'
import './ForgotPasswordPage.css'
import AuthBackgroundImage from '../../components/AuthBackgroundImage'
import AuthCard from '../../components/AuthCard'
import PrimaryButton from '../../components/PrimaryButton'
import Title from '../../components/Title'
import { AuthContext } from '../../context/AuthContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SubTitle from '../../components/SubTitle'
const apiUrl = "https://vunafind.onrender.com";


function ForgotPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [isLoggin, setIsLoggin] = useState(false);
  const authCtx = useContext(AuthContext);

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
  const navigate = useNavigate();

  function inputValidation() {
    let email = enteredEmail.includes('@');
    popUpMessage(
      "error",
      "red",
      "Failed Authentication!",
        !email
        ? "Please provide a valid email address"
        : '',
      5000
    );
  }
  const data = {
    email: enteredEmail,
  };
  async function onSubmitHandler(e) {
    e.preventDefault();
    setIsLoggin(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/auth/forgotPassword`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://vunafind.onrender.com", // replace with your own domain
          },
          mode: "cors",
          credentials: "include",
        }
      );
      authCtx.authenticate(response.data.token);
      authCtx.setUser(response.data.data.user);
      popUpMessage(
        "success",
        "green",
        "Successful Authentication!",
        "verify you email to login",
        5000
      );
      console.log(response);
      // if (response.data.data.user.isActive === false) {
      //   navigate("/verify-email");
      // }
    } catch (error) {
      inputValidation();
      console.log(error.response.data.error);
    }
    setIsLoggin(false);
  }

  if (isLoggin) {
    loadingMessage(
      "Authenticating User!",
      "Please wait while we create your account"
    );
  }

  const viewPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthBackgroundImage>
        <AuthCard>
        <Title style={{marginTop:28}}><span style={{color:'#1E523E'}}>Forgot Password?</span></Title>
        <SubTitle>Please confirm your email to reset your password</SubTitle>
        <form className='resend-verify-container'>
            <div className='email-holder'>
            <label>Email Address</label>
            <input type={'email'} value={enteredEmail} onChange={(e)=>setEnteredEmail(e.target.value)} placeholder="Enter your email"/>
            </div>
            <div style={{width:'100%'}}>
                <PrimaryButton>
                    Continue
                </PrimaryButton>

            </div>
        </form>
        </AuthCard>
    </AuthBackgroundImage>
  )
}

export default ForgotPasswordPage
