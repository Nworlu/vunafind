import React, { useContext, useEffect, useState } from 'react';
import './AdminAddHostelPage.css'
import axios from 'axios'
import { Add, ArrowLeft } from 'iconsax-react';
import user5 from '../../../assets/user5.png'
import { AuthContext } from '../../../context/AuthContext';
import Swal from 'sweetalert2';
import { Image, Video, Transformation,  } from 'cloudinary-react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../components/PrimaryButton';
const apiUrl = "https://vunafind.onrender.com";
const CLOUDINARY_UPLOAD_PRESET = "b5ct6uia"
function AdminAddHostelPage() {
    const [selectedFile, setSelectedFile] = useState(Array(8).fill(null));
    const [previewImages, setPreviewImages] = useState(Array(8).fill(null));
    const [uploadedImage, setUploadedImage] = useState('');
    const [enteredName,setEnteredName] = useState('');
    const [enteredCapacity,setEnteredCapacity] = useState('');
    const [enteredCategory,setEnteredCategory] = useState('');
    const [enteredPrice,setEnteredPrice] = useState('');
    const [isLoggin, setIsLoggin] = useState(false);
    const [eneteredDescription,setEneteredDescription] = useState('');
    // const [make,setMake] = useState('');
    const authCtx = useContext(AuthContext)
    const token = authCtx.userToken
    const navigate = useNavigate();
    useEffect(()=>{
        async function ping(){
            try {
                let response = await axios.get(`${apiUrl}/api/v1/hostel`,{headers:{
                    Authorization: `Bearer ${token}`
                }})
                console.log(response)
            } catch (error) {
                console.log(error)
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
      function inputValidation() {
		let name = enteredName !== ""
		let capacity = enteredCapacity !== ""
		let category = enteredCategory !== ""
		let price = enteredPrice !== ""

    //   let matricNo = enteredMatricNumber.includes('Vug/').toLowerCase();
      popUpMessage(
		"error",
		"red",
		"Failed!",
		!name
		  ? "Please provide make"
		  : !capacity
		  ? "Please provide model"
		  : !category
		  ? "Please Provide description"
		  : !price
		  ? "Please Provide price "
		  :"",
		5000
      );
    }
    function fileHandler(e, index) {
        const files = e.target.files;
        const fileArray = Array.from(files);
        setSelectedFile((prevFiles) => {
            prevFiles[index] = fileArray[0];
            return [...prevFiles];
          });

          const fileURL = URL.createObjectURL(files[0]);
          setPreviewImages((prevImages) => {
            prevImages[index] = fileURL;
            return [...prevImages];
          });
    }
    async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                Accept:"application/json, text/plain, */*",
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
      async function handleUpload(e) {
        e.preventDefault()
        if (selectedFile && selectedFile.length > 0) {
            setIsLoggin(true);

            const formDataArray = selectedFile.map((file) => {
              const formData = new FormData();
              formData.append('file', file);
              formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
              return formData;
            });

    const uploadPromises = formDataArray.map((formData) =>
      axios.post("https://api.cloudinary.com/v1_1/deqfgp7hg/upload", formData)
    );
    Promise.all(uploadPromises)
    .then((responses) => {
        // setIsLoggin(false);
      const imageUrls = responses.map((response) => response.data.secure_url);

      const postDataPromises = imageUrls.map((imageUrl) =>
        postData(`${apiUrl}/api/v1/hostel/posthostel`, {
          images: imageUrl,
        //   description: eneteredDescription,
          name: enteredName,
          price: parseInt(enteredPrice),
          capacity: parseInt(enteredCapacity),
          category: enteredCategory,
          user:authCtx.userInfo._id
        })
      );

      Promise.all(postDataPromises)
        .then((responses) => {
            console.log(responses)
        //   setIsLoggin(false);

          responses.forEach((res) => {
            if (res.success === true) {
            //   navigate('/cars');
        //   setIsLoggin(false);
              popUpMessage(
                "success",
                "green",
                "Successfully Uploaded",
                "verify you email to login",
                5000
              );
            }
          });
        })
        .catch((error) => {
          setIsLoggin(false);
          console.log(error);
        });
    })
    .catch((error) => {
      setIsLoggin(false);
      console.error('Error uploading images:', error);
      setIsLoggin(false);
    });
} else {
  inputValidation();
  setIsLoggin(false);
}
setIsLoggin(false);
}
// setIsLoggin(false);

if (isLoggin) {
            loadingMessage(
              "Creating Hostel!",
              "Please wait while we create the Hostel"
            );
          }
    return (
        <div className='admin-add-hostel-page-container'>
            <div className='admin-add-hostel-div'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <ArrowLeft style={{marginRight: 15}} />
                <h2>Back</h2>
                </div>
                <div className='admin-add-hostel-container-field'>
                    <h2>Add Images</h2>
                    <form className='admin-add-hostel-form' onSubmit={handleUpload}>
                        <div className='admin-add-images'>
                        {[...Array(8)].map((_, index) => (
    <label key={index}>

      {!previewImages[index] && <Add color='#1E523E' size={40}/>
      }
      <input type='file' multiple onChange={(e) => fileHandler(e, index)} />
      {previewImages[index] && (
        <img src={previewImages[index]} alt="Preview" className="preview-image" />
      )}
    </label>
  ))}
                        </div>
                        <div className='admin-number-of-items'>
                            <div className='admin-number-container'>
                                <label>Number of rooms</label>
                                <input type='text' value={enteredCapacity} onChange={(e)=>setEnteredCapacity(e.target.value)} placeholder='5' />
                                <p>Rooms</p>
                            </div>
                            {/* <div className='admin-number-container'>
                                <label>Number of bathrooms</label>
                                <input type='text' value={enteredCapacity} onChange={(e)=>setEnteredCapacity(e.target.value)} placeholder='5' />
                                <p>Bathrooms</p>
                            </div> */}
                            <div className='admin-number-container'>
                                <label>Name of hostel</label>
                                <input type='text' value={enteredName} onChange={(e)=>setEnteredName(e.target.value)} placeholder='Hostel B' />
                            </div>
                            <div className='admin-number-container'>
                                <label>Hostel type</label>
                                <input type='text' value={enteredCategory} onChange={(e)=>setEnteredCategory(e.target.value)} placeholder='Boy hostel' />
                            </div>
                            <div className='admin-number-container'>
                                <label>Price of hostel</label>
                                <input type='text' value={enteredPrice} onChange={(e)=>setEnteredPrice(e.target.value)} placeholder='N 360,000' />
                            </div>
                        </div>
                        <PrimaryButton type={'submit'}>
                            Post
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminAddHostelPage;
