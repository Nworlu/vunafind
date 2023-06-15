import { ArrowLeft, ArrowLeft2, ArrowRight2, Message } from 'iconsax-react'
import React, { useContext, useEffect, useState } from 'react'
import PrimaryButton from '../../../components/PrimaryButton'
// import '../AdminHostelDetailPage.css'
import '../../AppPages/Admin/AdminHostelDetailPage.css'
import hostelPic1 from '../../../assets/hostel1.png'
import hostelPic2 from '../../../assets/hostel2.png'
import hostelPic3 from '../../../assets/hostel3.png'
import hostelPic4 from '../../../assets/hostel4.png'
import hostelPic5 from '../../../assets/hostel5.png'
import userPic2 from '../../../assets/user2.png'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../../context/AuthContext'
import GetRoomModal from '../../../components/GetRoomModal'
const apiUrl = 'https://vunafind.onrender.com'
function StudentHostelDetailPage() {
  const authCtx = useContext(AuthContext)
  const { id } = useParams()
  const [hostel, setHostel] = useState({})
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isImageFullscreen, setIsImageFullscreen] = useState(false)

  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  // function openModal(){
  //     setOpen(true)
  // }
  // function openModal2(){
  //     setOpen2(true)
  // }
  let navigate = useNavigate()
  console.log(id)
  useEffect(() => {
    async function getHostelDetail() {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/hostel/hostel/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authCtx.userToken}`,
            },
          }
        )
        console.log(response.data.hostel)
        setHostel(response.data.hostel)
      } catch (error) {
        console.log(error)
      }
    }
    getHostelDetail()
  }, [])

  const nextHandler = () => {
    if (currentImageIndex < 4) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1)
    }
  }

  const prevHandler = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1)
    }
  }

  function openGetRoom() {
    setOpen(true)
  }
//   console.log(hostel.user)
const openFullscreen = () => {
  setIsImageFullscreen(true)
  console.log(isImageFullscreen)
}

const closeFullscreen = () => {
  setIsImageFullscreen(false)
}
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
            <div
              style={{ width: '100%', height: '100%' }}
              onClick={openFullscreen}
            >
              <img
                src={hostel?.images?.[currentImageIndex]}
                alt='Hostel Image'
                //   onClick={openFullscreen}
              />
            </div>
            <div className='arrow-button'>
              <ArrowLeft2 onClick={prevHandler} className='icon-left' />
              <ArrowRight2 onClick={nextHandler} className='icon-right' />
            </div>
          </div>
          <div className='admin-hostel-detailpage-div-images-rows'>
            <div className='admin-hostel-detailpage-div-images-cols'>
              <img src={hostel.images?.[1]} />
            </div>
            <div className='admin-hostel-detailpage-div-images-cols'>
              <img src={hostel.images?.[2]} />
            </div>
            <div className='admin-hostel-detailpage-div-images-cols'>
              <img src={hostel.images?.[3]} />
            </div>
            <div className='admin-hostel-detailpage-div-images-cols'>
              <img src={hostel.images?.[4]} />
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
                  {/* <Message/> */}
                  <img
                    width={50}
                    heig
                    ht={30}
                    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAV1BMVEX///8AAAC0tLR0dHTo6OiGhobc3NyWlpa5ubnT09NSUlLPz8/s7Ox3d3e9vb35+flqamoRERGmpqYkJCTFxcUaGhouLi5fX19CQkJKSkoJCQmPj49YWFhhZDFbAAAB50lEQVRoge2Y0XaCMAyGiQhtIQURhm7y/s+5UGSopIdp6y528l0a+I6F0D+nSSIIgiD4yFUWhMq96jqDYLLa47bhbgDL2zsqHUwegDmQomPlnwDq6bf0gAL4ZAsNAIbKEaBhC7SkULdfInKRi1zk75TnWbvOgKYo5+vKolnX2yz/jbz78mRMNl3my8Km25Yb5m9fcVGivOXWbMnrFKAw6yJeAD5o5fkHwIXJFFMApPWGHL+gZ9zEAHBMkiPAwJZNDw1uyPcU0mx1zG/lngqfwAmF835bnvI3l7O85OupyF+U0+Bh+ZvNLOebKbFu7GHldVfR79WOWq3QOw5q9IPW1BMXtqyp0Y87J+kexkUzeD+8FzjdLa6KqR6pbp4JfdO9Ylf7AqqnnWJ5MvSg++AZdAF7t1NcsXfrCKe6bbmpReNx97GIXOQiD5dH3Fpc4sxyREoAg/toIIXWAd3fjb6X3+7p/uEvEDXJTzaNjD39yD15HoL5Gzk/LARx+ZG/74Ue3yUfM7qu3LCkKaXP/Kz1BPpM2azd2FZdpws35qkI52fJZMFV+tsoXWNG72rjwiHK1kjeAfFBXuoWzhG2RjxDq8sH+YjnpPQp5jPbRW6X3gnm2tnLC91P59NRAgOnU/KoySYIgvA/+AZFRxlAVguuRwAAAABJRU5ErkJggg=='
                  />
                  <p>{hostel.capacity} Rooms</p>
                </div>
                {/* <div className='admin-hostel-detailpage-div-minor-hostel-sections-icons'>
                                <Message/>
                                <p>5 Bathrooms</p>
                            </div> */}
              </div>
            </div>
            {/* <div className='admin-hostel-detailpage-room-flat-container'>
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
                    </div> */}
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
              <p>{hostel?.user?.[0]?.name}</p>
            </div>
            <div className='admin-hostel-detailpage-div-button'>
              {/* <PrimaryButton
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
              </PrimaryButton> */}
              <PrimaryButton type='button' onClick={openGetRoom}>
                Get Room
              </PrimaryButton>
            </div>
          </div>
        </div>
        {open && <GetRoomModal />}
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

export default StudentHostelDetailPage
