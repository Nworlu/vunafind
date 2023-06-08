import "./StudentSignupPage.css";
import axios from "axios";
import { useState, useContext } from "react";
import signupImage from "../../assets/signup-back.png";
import { EyeSlash, Eye } from "iconsax-react";
import { NavLink, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import AuthPicBackground from "../../components/AuthPicBackground";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AuthContext } from "../../context/AuthContext";
import AuthBackgroundImage from "../../components/AuthBackgroundImage";
import AuthCard from "../../components/AuthCard";
const apiUrl = "https://vunafind.onrender.com";
const StudentSignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState();
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
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  }
  const navigate = useNavigate();

  function inputValidation() {
    let name = enteredName !== "";
    let email = enteredEmail.includes("@");
    let phoneNumber = enteredPhoneNumber > 11 || parseInt(enteredPhoneNumber);
    let password = enteredPassword.length > 6;
    let matricNo = enteredMatricNumber !== '';
    popUpMessage(
      "error",
      "red",
      "Failed Authentication!",
      !name
        ? "Please provide your details"
        : !email
        ? "Please provide a valid email"
        : !phoneNumber
        ? "Your phone number must be 10"
        : !password
        ? "Your password must be more than 6 "
        : !matricNo? "Please provide a vaild matric number": '',
      5000
    );
  }
  const data = {
    name: enteredName,
    email: enteredEmail,
    password: enteredPassword,
    phonenumber: enteredPhoneNumber,
    matricno:enteredMatricNumber
  };
  async function onSubmitHandler(e) {
    e.preventDefault();
    setIsLoggin(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/auth/signup`,
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
      popUpMessage(
        "success",
        "green",
        "Successful Authentication!",
        "verify you email to login",
        5000
      );
      console.log(response);
      authCtx.setUserData(response.data.data.user)
      authCtx.setUserTokenData(response.data.token)

      if (response.data.data.user.isActive === false) {
        navigate("/otp-verify");
      }
    setIsLoggin(false);

    } catch (error) {
    setIsLoggin(false);
      inputValidation();
      console.log(error);
    setIsLoggin(false);

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

      <AuthBackgroundImage style={{padding:20}}>
        <AuthCard style={{width:'800px',height:'100%'}}>
      <div className="signup-div">
        <div className="signup-header">
          <h1>APPLICANT LOGIN</h1>
          <p>Enter your details to gain access to our application</p>
        </div>
        <form
          className="signup-form-div"
          onSubmit={onSubmitHandler}
          autoComplete="off"
        >
          <div className="name-holder">
            <label htmlFor="nameHolder">Name</label>
            <input
              type="text"
              name="nameHolder"
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
              id="nameHolder"
              autoComplete="new-password"
            />
          </div>
          <div className="email-holder">
            <label htmlFor="emailHolder">Email</label>
            <input
              type="email"
              name="emailHolder"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              id="emailHolder"
              autoComplete="new-password"
            />
          </div>
          <div className="password-holder">
            <label htmlFor="passwordHolder">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="passwordHolder"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              autoComplete="new-password"
              id="passwordHolder"
            />
            <button
              type="button"
              className="show-password"
              onClick={viewPasswordHandler}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </button>
          </div>
          <div className="phone-holder">
            <label htmlFor="phoneHolder">Phone Number</label>
            <PhoneInput
              international
              defaultCountry="NG"
              limitMaxLength={true}
              name="phoneHolder"
              id="phoneHolder"
              countrySelectProps={{ unicodeFlags: false }}
              value={enteredPhoneNumber}
              onChange={setEnteredPhoneNumber}
              autoComplete="new-password"
            />

          </div>
          <div className="matric-holder">
            <label htmlFor="matricHolder">Matric number</label>
            <input
              type="text"
              name="matricHolder"
              value={enteredMatricNumber}
              onChange={(e) => setEnteredMatricNumber(e.target.value)}
              id="matricHolder"
              autoComplete="new-password"
            />
          </div>
          <PrimaryButton type={'submit'} style={{marginTop: 20}} disabled={isLoggin ? true : false}>

            Register
          </PrimaryButton>
        </form>

      </div>

        </AuthCard>
      </AuthBackgroundImage>

  );
};

export default StudentSignupPage;
