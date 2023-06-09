import { ArrowLeft, ArrowLeft2, ArrowRight2, Message } from 'iconsax-react'
import React, { useContext, useEffect, useState } from 'react'
import PrimaryButton from '../../../components/PrimaryButton'
import './AdminHostelDetailPage.css'
import hostelPic1 from '../../../assets/hostel1.png'
import hostelPic2 from '../../../assets/hostel2.png'
import hostelPic3 from '../../../assets/hostel3.png'
import hostelPic4 from '../../../assets/hostel4.png'
import hostelPic5 from '../../../assets/hostel5.png'
import userPic2 from '../../../assets/user2.png'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../../context/AuthContext'
const apiUrl = 'https://vunafind.onrender.com'
function AdminHostelDetailPage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isImageFullscreen, setIsImageFullscreen] = useState(false)
    const authCtx = useContext(AuthContext)
    const { id } = useParams()
    const [hostel, setHostel] = useState({})
  const nextHandler = () => {
  if (currentImageIndex < 4) {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  }
};

const prevHandler = () => {
  if (currentImageIndex > 0) {
    setCurrentImageIndex((prevIndex) => prevIndex - 1);
  }
};
const openFullscreen = () => {
    setIsImageFullscreen(true)
    console.log(isImageFullscreen)
}

const closeFullscreen = () => {
  setIsImageFullscreen(false)
}

    useEffect(()=>{
        async function getHostelDetail(){
            try {
                const response = await axios.get(`${apiUrl}/api/v1/hostel/hostel/${id}`,{headers:{
                    Authorization: `Bearer ${authCtx.userToken}`
                }})
                console.log(response.data.hostel)
                setHostel(response.data.hostel)
            } catch (error) {
                console.log(error)
            }
        }
        getHostelDetail()
    },[])
  return (
    <div className='admin-hostel-detailpage-container'>
      <div className='admin-hostel-detailpage-container-back'>
        {/* <div className='arrow'>
            <ArrowLeft className='icon'/>
            <p>Back to manage hostels</p>
            </div>
            <NavLink>Edit Hostel</NavLink> */}
      </div>
      <div className='admin-hostel-detailpage-div'>
        <div className='admin-hostel-detailpage-div-images'>
          <div className='admin-hostel-detailpage-div-img-container'>
            <div style={{width:'100%', height:'100%'}} onClick={openFullscreen}>
              <img
                src={hostel?.images?.[currentImageIndex]}
                alt='Hostel Image'
                //   onClick={openFullscreen}
              />
            </div>
            <div className='arrow-button'>
              <ArrowLeft2 className='icon-left' onClick={prevHandler} />
              <ArrowRight2 className='icon-right' onClick={nextHandler} />
            </div>
          </div>
          <div className='admin-hostel-detailpage-div-images-rows'>
            <div className='admin-hostel-detailpage-div-images-cols'>
              <img src={hostel?.images?.[1]} />
            </div>
            <div className='admin-hostel-detailpage-div-images-cols'>
              <img src={hostel?.images?.[2]} />
            </div>
            <div className='admin-hostel-detailpage-div-images-cols'>
              <img src={hostel?.images?.[3]} />
            </div>
            <div className='admin-hostel-detailpage-div-images-cols'>
              <img src={hostel?.images?.[4]} />
            </div>
          </div>
          <div className='admin-hostel-detailpage-div-minor-desc'>
            <h2>N {hostel?.price}</h2>
            <div className='admin-hostel-detailpage-div-minor-desc-product'>
              <div className='admin-hostel-detailpage-div-minor-hostel-name'>
                <p>{hostel?.name}</p>
                <span>Old {hostel?.category} hostel</span>
              </div>
              <div className='admin-hostel-detailpage-div-minor-hostel-sections'>
                <div className='admin-hostel-detailpage-div-minor-hostel-sections-icons'>
                  <Message />
                  <p>5 Rooms</p>
                </div>
                <div className='admin-hostel-detailpage-div-minor-hostel-sections-icons'>
                  <Message />
                  <p>5 Bathrooms</p>
                </div>
              </div>
            </div>
            <div className='admin-hostel-detailpage-room-flat-container'>
              <div className='admin-hostel-detailpage-room-flat-icon'>
                <p>Icon</p>
                <p>4 flats / room</p>
              </div>
              <div className='admin-hostel-detailpage-room-flat-icon'>
                <p>Icon</p>
                <p>4 flats / room</p>
              </div>
              <div className='admin-hostel-detailpage-room-flat-icon'>
                <p>Icon</p>
                <p>4 flats / room</p>
              </div>
            </div>
          </div>
        </div>
        <div className='admin-hostel-detailpage-div-adminstrator'>
          <div className='admin-hostel-detailpage-div-adminstrator-title'>
            <p>Hostel Administrator</p>
          </div>
          <div className='admin-hostel-detailpage-div-adminstrator-des'>
            <div className='admin-hostel-detailpage-div-adminstrator-des-object'>
              <div className='admin-hostel-detailpage-div-adminstrator-des-img-container'>
                <img src={userPic2} />
              </div>
              <p>{authCtx.userInfo.name}</p>
            </div>
            <div className='admin-hostel-detailpage-div-button'>
              <PrimaryButton
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Message />
                <span style={{ marginLeft: 10 }}>Contact</span>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
      {isImageFullscreen && (
        <div className='fullscreen-overlay' onClick={closeFullscreen}>
          <img
            src={hostel?.images?.[currentImageIndex]}
            className='fullscreen-image'
          />
        </div>
      )}
    </div>
  )
}

export default AdminHostelDetailPage
