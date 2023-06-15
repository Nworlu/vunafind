import { CloseCircle } from 'iconsax-react'
import React, { useContext, useState } from 'react'
import './EditModal.css'
import PrimaryButton from './PrimaryButton'
import { AuthContext } from '../context/AuthContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const apiUrl = 'https://vunafind.onrender.com'

const EditModal = ({ onClose }) => {
    const [enteredInterests, setEnteredInterests] = useState('')
    const [enteredHobbies, setEnteredHobbies] = useState('')
    const [enteredHostelCategory, setEnteredHostelCategory] = useState()
    const [enteredLevel, setEnteredLevel] = useState('')
  const [enteredDepartment, setEnteredDepartment] = useState('')
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

  function inputValidation() {
    let interests = enteredInterests !== ''
    let hobbies = enteredHobbies !== ''
    let hostelCategory = enteredHostelCategory !== ''
    let level = enteredLevel !== ''
    let department = enteredDepartment !== ''
    popUpMessage(
      'error',
      'red',
      'Failed Authentication!',
      interests
        ? 'Please provide your details'
        : !hostelCategory
        ? 'Please provide a valid email'
        : !level
        ? 'Your phone number must be 10'
        : !department
        ? 'Your password must be more than 6 '
        : !hobbies
        ? 'Please provide a valid'
        : '',
      5000
    )
  }
  const data = {
    level: enteredLevel,
    department: enteredDepartment,
    interests: enteredInterests,
    hobbies: enteredHobbies,
    hostelCategory: enteredHostelCategory,
  }
  async function onSubmitHandler(e) {
    e.preventDefault()
    setIsLoggin(true)
    try {
      const response = await axios.put(
        `${apiUrl}/api/v1/user/createprofile/${authCtx.userInfo._id}`,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${authCtx.userToken}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://vunafind.onrender.com', // replace with your own domain
          },
          mode: 'cors',
          credentials: 'include',
        }
      )
      authCtx.setUserData(response.data.data)
      if (response.data.success === true) {
        window.location.reload()
        onClose()
        // navigate(`/student/getprofile/${authCtx.userInfo._id}`)
      }
      // authCtx.setUserTokenData(response.data.token)
      popUpMessage(
        'success',
        'green',
        'Successful!',
        'Your profile has been successfully setup',
        5000
      )
      console.log(response)
    } catch (error) {
      inputValidation()
      console.log(error.response)
    }
    setIsLoggin(false)
  }

  // if (isLoggin) {
  //   loadingMessage(
  //     'Authenticating User!',
  //     'Please wait while we create your account'
  //   )
  // }

  return (
    <>
      <div className='edit-profile-container'>
        <div className='edit-profile-div'>
          <div className='edit-profile-header'>
            <h2>Edit Profile</h2>
            <CloseCircle onClick={onClose} />
          </div>
          <form
            className='edit-profile-form'
            onSubmit={onSubmitHandler}
            autoComplete='off'
          >
            <div>
              <h1></h1>
              <p></p>
            </div>
            <div className='email-holder'>
              <label htmlFor='interestHolder'>Interests</label>
              <input
                type='text'
                name='interestHolder'
                value={enteredInterests}
                required
                onChange={(e) => setEnteredInterests(e.target.value)}
                id='interestHolder'
                autoComplete='new-password'
              />
            </div>
            <div className='email-holder'>
              <label htmlFor='hobbiesHolder'>Hobbies</label>
              <input
                type='text'
                name='hobbiesHolder'
                value={enteredHobbies}
                required
                onChange={(e) => setEnteredHobbies(e.target.value)}
                id='hobbiesHolder'
                autoComplete='new-password'
              />
            </div>
            <div className='email-holder'>
              <label htmlFor='hostelHolder'>Hostel Type</label>
              <input
                type='text'
                name='hostelHolder'
                value={enteredHostelCategory}
                required
                onChange={(e) => setEnteredHostelCategory(e.target.value)}
                id='hostelHolder'
                autoComplete='new-password'
              />
            </div>
            <div className='email-holder'>
              <label htmlFor='levelHolder'>Level</label>
              <input
                type='text'
                name='levelHolder'
                required
                value={enteredLevel}
                onChange={(e) => setEnteredLevel(e.target.value)}
                id='levelHolder'
                autoComplete='new-password'
              />
            </div>
            <div className='email-holder'>
              <label htmlFor='departmentHolder'>Department</label>
              <input
                type='text'
                name='departmentHolder'
                required
                value={enteredDepartment}
                onChange={(e) => setEnteredDepartment(e.target.value)}
                id='departmentHolder'
                autoComplete='new-password'
              />
            </div>

            <PrimaryButton
              disabled={isLoggin ? true : false}
              style={{ marginTop: 20 }}
            >
              {isLoggin ? 'loading.....' : 'Submit'}
            </PrimaryButton>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditModal
