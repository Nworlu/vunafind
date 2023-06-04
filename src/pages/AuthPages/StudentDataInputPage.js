import "./StudentDataInputPage.css";
import axios from "axios";
import { useState, useContext } from "react";
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
const StudentDataInputPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
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
    let fullName = enteredName !== "";
    let email = enteredEmail.includes("@");
    let phoneNumber = enteredPhoneNumber > 11 || parseInt(enteredPhoneNumber);
    let password = enteredPassword.length > 6;
    popUpMessage(
      "error",
      "red",
      "Failed Authentication!",
      !fullName
        ? "Please provide your details"
        : !email
        ? "Please provide a valid email"
        : !phoneNumber
        ? "Your phone number must be 10"
        : !password
        ? "Your password must be more than 6 "
        : "",
      5000
    );
  }
  const data = {
    fullName: enteredName,
    email: enteredEmail,
    phonenumber: enteredPhoneNumber,
    password: enteredPassword,
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
            "Access-Control-Allow-Origin": "https://turfind.onrender.com", // replace with your own domain
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
      console.log(enteredPhoneNumber.length);
      if (response.data.data.user.isActive === false) {
        navigate("/verify-email");
      }
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
    <div className="container">
      <AuthPicBackground image={signupImage} alt={"student-set-image"} />
      <div className="student-set-div">
        <div className="student-set-header">
          <h1>Set Profile (Primary Details)</h1>
          <p>We would love to get to know you more</p>
        </div>
        <form
          className="student-set-form-div"
          onSubmit={onSubmitHandler}
          autoComplete="off"
        >
          <div className="email-holder">
            <label htmlFor="emailHolder">Name</label>
            <input
              type="text"
              name="emailHolder"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              id="emailHolder"
              autoComplete="new-password"
            />
          </div>
          <div className="email-holder">
            <label htmlFor="emailHolder">Level</label>
            <input
              type="text"
              name="emailHolder"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              id="emailHolder"
              autoComplete="new-password"
            />
          </div>
          <div className="email-holder">
            <label htmlFor="emailHolder">Department</label>
            <input
              type="text"
              name="emailHolder"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              id="emailHolder"
              autoComplete="new-password"
            />
          </div>
          <div className="email-holder">
            <label htmlFor="emailHolder">Matric Number</label>
            <input
              type="text"
              name="emailHolder"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              id="emailHolder"
              autoComplete="new-password"
            />
          </div>


          <PrimaryButton disabled={isLoggin ? true : false}>
            {isLoggin ? "loading....." : "Continue"}
          </PrimaryButton>
        </form>
        {/* <SocialComponent
          googleIcon={googleIcon}
          url={"/login"}
          facebookIcon={facebookIcon}
          message={"Already have an account"}
          text={"Login"}
        /> */}
      </div>
    </div>
  );
};

export default StudentDataInputPage;
