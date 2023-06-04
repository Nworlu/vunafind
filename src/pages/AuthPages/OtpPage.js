import "./OtpPage.css";
import axios from "axios";
import { useState, useContext, useRef } from "react";
import signupImage from "../../assets/signup-back.png";
// import googleIcon from "../../../assets/images/google.png";
// import facebookIcon from "../../../assets/images/facebook.png";
import { EyeSlash, Eye } from "iconsax-react";
import { NavLink, useNavigate } from "react-router-dom";
// import SocialComponent from "../../../components/ui/SocialComponent";
import PrimaryButton from "../../components/PrimaryButton";
import AuthPicBackground from "../../components/AuthPicBackground";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AuthContext } from "../../context/AuthContext";
const apiUrl = "https://turfind.onrender.com";
const OtpPage = () => {
    const authCtx = useContext(AuthContext)
    const [otp1,setOtp1] = useState("")
    const [otp2,setOtp2] = useState("")
    const [otp3,setOtp3] = useState("")
    const [otp4,setOtp4] = useState("")
    const [isLoggin, setIsLoggin] = useState(false)

    let navigate = useNavigate()

    const otp1Ref = useRef()
    const otp2Ref = useRef()
    const otp3Ref = useRef()
    const otp4Ref = useRef()
    console.log(authCtx)

    function popUpMessage(icon,color,title,text,timer){
      Swal.fire({
        icon: icon,
        color: color,
        title: title,
        text: text,
        timer: timer,
        showConfirmButton: false
       })
    }

    let data ={
      otp1,otp2,otp3,otp4
    }

    const isOtpValid = obj=>{
      return Object.values(obj)
    }
    let otp = isOtpValid(data).join('').toString()
   async function handleSubmit(e){
      e.preventDefault()
      setIsLoggin(true)
      try {
        const response = await axios.post(`${apiUrl}/api/v1/auth/verify`, JSON.stringify({otpCode:parseInt(otp)}), {
          headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "https://turfind.onrender.com", // replace with your own domain
        },
        mode: "cors",
        credentials: 'include',
      })
      popUpMessage('success', 'green', 'Successful Verification!', 'Login to continue', 3000)
      navigate('/login', {replace: true})
      console.log(response)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          color: 'red',
          title: 'Failed Verification!',
          text: error.response.data.error,
          timer: 5000,
          showConfirmButton: false
         })
        console.log(error.response.data.error)
      }
      setIsLoggin(false)
    }
    if(isLoggin){
      let timerInterval
      Swal.fire({
        title: "Verifying User's Email!",
        text: "Please hold on while we try to verify your email",
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    }
    const inputfocus = (elmnt) => {
      if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
        const next = elmnt.target.tabIndex - 2;
        if (next > -1) {

          elmnt.target.form.elements[next].focus()
        }
      }
      else {
        console.log("next");

          const next = elmnt.target.tabIndex;
          if (next < 4) {
            elmnt.target.form.elements[next].focus()
          }
      }

    }
  return (
    <div className="container">
      <AuthPicBackground image={signupImage} alt={"signup-image"} />
      <div className="emailVerify-div">
        <div className="emailVerify-header">
          <h1>Email Verification</h1>
          {/* <p>We sent a 4 digit Otp to {authCtx.userInfo.email}</p> */}
          <p>We sent a 4 digit Otp to </p>
        </div>
        <form className="emailVerify-form-div" autoComplete="off" onSubmit={handleSubmit} >
          <div className='input-div'>
            <input ref={otp1Ref} name='otp1'  value={otp1}  onChange={(e)=>setOtp1(e.target.value)} onKeyUp={(e)=>inputfocus(e)}  type='text'   className='input-text' tabIndex="1" maxLength="1" autoComplete="new-password" />
            <input ref={otp2Ref} name='otp2' value={otp2} onChange={(e)=>setOtp2(e.target.value)} onKeyUp={(e)=>inputfocus(e)}  type='text' className='input-text' tabIndex="2" maxLength="1" autoComplete="new-password"  />
            <input ref={otp3Ref} name='otp3' value={otp3} onChange={(e)=>setOtp3(e.target.value)} onKeyUp={(e)=>inputfocus(e)}  type='text' className='input-text' tabIndex="3" maxLength="1" autoComplete="new-password"  />
            <input ref={otp4Ref} name='otp4' value={otp4} onChange={(e)=>setOtp4(e.target.value)} onKeyUp={(e)=>inputfocus(e)} type='text' className='input-text' tabIndex="4" maxLength="1" autoComplete="new-password" />
          </div>
          <PrimaryButton>
            Register
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
