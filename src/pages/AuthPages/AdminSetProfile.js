import "./AdminSetProfile.css";
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
import AuthBackgroundImage from "../../components/AuthBackgroundImage";
import AuthCard from "../../components/AuthCard";
const apiUrl = "https://vunafind.onrender.com";
const AdminSetProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [enteredGender, setEnteredGender] = useState("");
  const [enteredRole, setEnteredRole] = useState("");
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
    let gender = enteredGender !== "";
    let role = enteredRole !== "";
    popUpMessage(
      "error",
      "red",
      "Failed Authentication!",
       !gender
        ? "you didnt enter a gender"
        : !role
        ? "you didn't enter a role"
        : 'Please provide a valid',
      5000
    );
  }
  const data = {
    Gender: enteredGender,
    role: enteredRole,
  };
  async function onSubmitHandler(e) {
    e.preventDefault();
    setIsLoggin(true);
    try {
      const response = await axios.put(
        `${apiUrl}/api/v1/user/admin/${authCtx.userInfo._id}`,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${authCtx.userToken}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://vunafind.onrender.com", // replace with your own domain
          },
          mode: "cors",
          credentials: "include",
        }
      );
      authCtx.setUserData(response.data.data)
      if(response.data.success === true) {
        navigate(`/admin/getprofile/${authCtx.userInfo._id}`)
      }
      // authCtx.setUserTokenData(response.data.token)
      popUpMessage(
        "success",
        "green",
        "Successful!",
        "Your profile has been successfully setup",
        5000
      );
      console.log(response);

    } catch (error) {
      inputValidation();
      console.log(error.response);
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
    // <div className="container">
      // <AuthPicBackground image={signupImage} alt={"student-set-image"} />
      <AuthBackgroundImage style={{padding:30}}>
        <AuthCard style={{width:800, height: '100%'}}>
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
            <label htmlFor="genderHolder">Gender</label>
            <input
              type="text"
              name="genderHolder"
              value={enteredGender}
              onChange={(e) => setEnteredGender(e.target.value)}
              id="genderHolder"
              autoComplete="new-password"
            />
          </div>
          <div className="email-holder">
            <label htmlFor="roleHolder">Role</label>
            <input
              type="text"
              name="roleHolder"
              value={enteredRole}
              onChange={(e) => setEnteredRole(e.target.value)}
              id="roleHolder"
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
        </AuthCard>
      </AuthBackgroundImage>
    // </div>
  );
};

export default AdminSetProfile;
