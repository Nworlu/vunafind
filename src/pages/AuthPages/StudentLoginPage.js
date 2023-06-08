import React, { useContext, useState } from 'react'
import { EyeSlash, Eye } from "iconsax-react";
import './StudentLoginPage.css'
import AuthBackgroundImage from '../../components/AuthBackgroundImage'
import AuthCard from '../../components/AuthCard'
import PrimaryButton from '../../components/PrimaryButton'
import Title from '../../components/Title'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const apiUrl = "https://vunafind.onrender.com";
function StudentLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredMatricNumber, setEnteredMatricNumber] = useState("");
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

  function inputValidation(error) {
    let password = enteredPassword.length > 6;
    let matricNo = enteredMatricNumber.includes('Vug/');
    popUpMessage(
      "error",
      "red",
      "Failed Authentication!",
        !password
        ? "Your password must be more than 6 "
        : !matricNo? "Please provide a vaild matric number": error,
      5000
    );
  }
  const data = {
    password: enteredPassword,
    matricno:enteredMatricNumber
  };
  async function onSubmitHandler(e) {
    e.preventDefault();
    setIsLoggin(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/auth/login`,
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
      authCtx.setUserData(response.data.data.user)
      authCtx.setUserTokenData(response.data.token)
      popUpMessage(
        "success",
        "green",
        "Successful Authentication!",
        "verify you email to login",
        5000
      );
      console.log(response);
      if (response.data.data.user) {
        navigate("/student/dashboard");
      }
    } catch (error) {
      inputValidation(error.response.data.error);
      console.log(error.response.data.error);
    }
    setIsLoggin(false);
  }

  if (isLoggin) {
    loadingMessage(
      "Authenticating User!",
      "Please wait while we verify your details"
    );
  }

  const viewPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthBackgroundImage>
        <AuthCard >
        <Title style={{marginTop:28}}><span style={{color:'#1E523E'}}>Student</span> Login</Title>
        <form className='student-login-container' onSubmit={onSubmitHandler}  autoComplete="off">
            <div className='email-holder'>
            <label>Veritas Email</label>
            <input type={'text'} autoComplete="new-password" onChange={(e)=>setEnteredMatricNumber(e.target.value)} placeholder="Enter your veritas given email"/>
            </div>
            <div className='password-holder'>
            <label>Password</label>
            <input type={'password'} autoComplete="new-password" onChange={(e)=>setEnteredPassword(e.target.value)} placeholder="Enter your valid Password"/>
            <button
              type="button"
              className="show-password"
              onClick={viewPasswordHandler}

            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </button>
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
