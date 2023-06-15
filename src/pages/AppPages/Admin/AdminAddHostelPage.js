import React, { useContext, useState } from 'react'
import './AdminAddHostelPage.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Image, Transformation } from 'cloudinary-react'
import { AuthContext } from '../../../context/AuthContext'
import PrimaryButton from '../../../components/PrimaryButton'
import { useNavigate } from 'react-router-dom'

const apiUrl = 'https://vunafind.onrender.com'
const CLOUDINARY_UPLOAD_PRESET = 'b5ct6uia'

function AdminAddHostelPage() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previewImages, setPreviewImages] = useState([])

  const [enteredName, setEnteredName] = useState('')
  const [enteredCapacity, setEnteredCapacity] = useState('')
  const [enteredCategory, setEnteredCategory] = useState('')
  const [enteredPrice, setEnteredPrice] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  const authCtx = useContext(AuthContext)
  const token = authCtx.userToken
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

  function inputValidation() {
    let name = enteredName !== ''
    let capacity = enteredCapacity !== ''
    let category = enteredCategory !== ''
    let price = enteredPrice !== ''

    popUpMessage(
      'error',
      'red',
      'Failed!',
      !name
        ? 'Please provide a name'
        : !capacity
        ? 'Please provide a capacity'
        : !category
        ? 'Please provide a category'
        : !price
        ? 'Please provide a price'
        : '',
      5000
    )
  }

function fileHandler(e, index) {
  const files = e.target.files
  const fileArray = Array.from(files)
  setSelectedFiles((prevFiles) => {
    prevFiles[index] = fileArray[0]
    return [...prevFiles]
  })

  const fileURL = URL.createObjectURL(fileArray[0])
  setPreviewImages((prevImages) => {
    prevImages[index] = fileURL
    return [...prevImages]
  })
}





async function handleUpload(e) {
  e.preventDefault()
  setIsLoading(true)
  if (selectedFiles.length === 0) {
    inputValidation()
    return
  }

  const formDataArray = selectedFiles.map((file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    return formData
  })

  try {
    const uploadResponses = await Promise.all(
      formDataArray.map((formData) =>
        axios.post('https://api.cloudinary.com/v1_1/deqfgp7hg/upload', formData)
      )
    )

    const imageUrls = uploadResponses.map(
      (response) => response.data.secure_url
    )

    const postData = {
      images: imageUrls,
      name: enteredName,
      price: parseInt(enteredPrice),
      capacity: parseInt(enteredCapacity),
      category: enteredCategory,
      user: authCtx.userInfo._id,
    }

    const response = await axios.post(
      `${apiUrl}/api/v1/hostel/posthostel`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
  setIsLoading(false)
      console.log(response)
    if (response.data.success) {
    setIsLoading(false)
      popUpMessage(
        'success',
        'green',
        'Successfully Uploaded',
        'Your Hostel has been successfully uploaded',
        5000
      )
      navigate('/admin/dashboard')
    }
  setIsLoading(false)
  } catch (error) {
    if (error) {
      setIsLoading(false)
    }
    console.log(error)
  setIsLoading(false)
  }
}

  if (isLoading) {
        loadingMessage(
          'Creating Hostel!',
          'Please wait while we create the Hostel'
    )
  }

  return (
    <div className='admin-add-hostel-page-container'>
      <div className='admin-add-hostel-div'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2>Back</h2>
        </div>
        <div className='admin-add-hostel-container-field'>
          <h2>Add Images</h2>
          <form className='admin-add-hostel-form' onSubmit={handleUpload}>
            <div className='admin-add-images'>
              {[...Array(8)].map((_, index) => (
                <label key={index}>
                  {!previewImages[index] ? (
                    <div className='add-image-placeholder'>
                      <span>+</span>
                      <p>Upload Image</p>
                    </div>
                  ) : (
                    <img
                      src={previewImages[index]}
                      alt='Preview'
                      className='preview-image'
                    />
                  )}
                  <input
                    type='file'
                    onChange={(e) => fileHandler(e, index)}
                    style={{ display: 'none' }}
                  />
                </label>
              ))}
            </div>

            <div className='admin-number-of-items'>
              <div className='admin-number-container'>
                <label>Number of rooms</label>
                <input
                  type='text'
                  value={enteredCapacity}
                  onChange={(e) => setEnteredCapacity(e.target.value)}
                  placeholder='5'
                />
                <p>Rooms</p>
              </div>
              <div className='admin-number-container'>
                <label>Name of hostel</label>
                <input
                  type='text'
                  value={enteredName}
                  onChange={(e) => setEnteredName(e.target.value)}
                  placeholder='Hostel B'
                />
              </div>
              <div className='admin-number-container'>
                <label>Hostel type</label>
                <input
                  type='text'
                  value={enteredCategory}
                  onChange={(e) => setEnteredCategory(e.target.value)}
                  placeholder='Boy hostel'
                />
              </div>
              <div className='admin-number-container'>
                <label>Price of hostel</label>
                <input
                  type='text'
                  value={enteredPrice}
                  onChange={(e) => setEnteredPrice(e.target.value)}
                  placeholder='N 360,000'
                />
              </div>
            </div>
            <PrimaryButton type='submit'>Post</PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminAddHostelPage
