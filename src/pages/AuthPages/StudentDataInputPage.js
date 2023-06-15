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
import AuthBackgroundImage from "../../components/AuthBackgroundImage";
import AuthCard from "../../components/AuthCard";
const apiUrl = "https://vunafind.onrender.com";
const StudentDataInputPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [enteredInterests, setEnteredInterests] = useState("");
  const [enteredHobbies, setEnteredHobbies] = useState("");
  const [enteredHostelCategory, setEnteredHostelCategory] = useState();
  const [enteredLevel, setEnteredLevel] = useState("");
  const [enteredDepartment, setEnteredDepartment] = useState("");
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
    let interests = enteredInterests !== "";
    let hobbies = enteredHobbies !== "";
    let hostelCategory = enteredHostelCategory !== "";
    let level = enteredLevel !== "";
    let department = enteredDepartment !== "";
    popUpMessage(
      "error",
      "red",
      "Failed Authentication!",
      !interests
        ? "Please provide your details"
        : !hostelCategory
        ? "Please provide a valid email"
        : !level
        ? "Your phone number must be 10"
        : !department
        ? "Your password must be more than 6 "
        : !hobbies? 'Please provide a valid': '',
      5000
    );
  }
  const data = {
    level: enteredLevel,
    department: enteredDepartment,
    interests: enteredInterests,
    hobbies: enteredHobbies,
    hostelCategory: enteredHostelCategory,
  };
  async function onSubmitHandler(e) {
    e.preventDefault();
    setIsLoggin(true);
    try {
      const response = await axios.put(
        `${apiUrl}/api/v1/user/createprofile/${authCtx.userInfo._id}`,
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
        navigate(`/student/getprofile/${authCtx.userInfo._id}`)
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
            <label htmlFor="interestHolder">Interests</label>
            <input
              type="text"
              name="interestHolder"
              value={enteredInterests}
              onChange={(e) => setEnteredInterests(e.target.value)}
              id="interestHolder"
              autoComplete="new-password"
            />
          </div>
          <div className="email-holder">
            <label htmlFor="hobbiesHolder">Hobbies</label>
            <input
              type="text"
              name="hobbiesHolder"
              value={enteredHobbies}
              onChange={(e) => setEnteredHobbies(e.target.value)}
              id="hobbiesHolder"
              autoComplete="new-password"
            />
          </div>
          <div className="email-holder">
            <label htmlFor="hostelHolder">Hostel Type</label>
            <input
              type="text"
              name="hostelHolder"
              value={enteredHostelCategory}
              onChange={(e) => setEnteredHostelCategory(e.target.value)}
              id="hostelHolder"
              autoComplete="new-password"
            />
          </div>
          <div className="email-holder">
            <label htmlFor="levelHolder">Level</label>
            <input
              type="text"
              name="levelHolder"
              value={enteredLevel}
              onChange={(e) => setEnteredLevel(e.target.value)}
              id="levelHolder"
              autoComplete="new-password"
            />
          </div>
          <div className="email-holder">
            <label htmlFor="departmentHolder">Department</label>
            <input
              type="text"
              name="departmentHolder"
              value={enteredDepartment}
              onChange={(e) => setEnteredDepartment(e.target.value)}
              id="departmentHolder"
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

export default StudentDataInputPage;
