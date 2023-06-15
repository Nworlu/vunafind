import React, { useContext, useEffect, useState } from 'react';
import './StudentGetProfile.css'
import { ArrowLeft } from 'iconsax-react';
import user5 from '../../../assets/user5.png'
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import EditModal from '../../../components/EditModal';
function StudentGetProfile() {
const apiUrl = "https://vunafind.onrender.com";
    const authCtx = useContext(AuthContext)
    const [user, setUser] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const {id} = useParams()
    let navigate = useNavigate()
    useEffect(()=>{
        async function getProfile(){
            try {
                const response = await axios.get(`${apiUrl}/api/v1/user/profile/${id}`, {
                    headers:{
                        Authorization: `Bearer ${authCtx.userToken}`
                    }
                })
                console.log(response)
                setUser(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProfile()
    }, [])
    function handleDelete() {
        alert('You are not authorizated to perform this action')
    }
    function handleOpenModal(){
        setOpenModal(true)
        console.log(openModal)
    }
    function handleCloseModal(){
        setOpenModal(false)
        console.log(openModal)
    }
    // console.log(user.hobbies.length < 0)
    return (
      <div className='admin-manage-student-page-container'>
        <div className='admin-manage-student-detail-div'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ArrowLeft style={{ marginRight: 15 }} />
            {/* <h2>Back to manage students</h2> */}
          </div>
          <div className='admin-get-profile-student-container'>
            <div className='admin-get-profile-student-pic'>
              <div className='admin-get-student-img-container'>
                <img src={user5} />
              </div>
              <div>
                <button style={{color:'green'}} onClick={handleOpenModal}>Edit Profile</button>
              </div>
            </div>
            <div className='admin-get-student-detail-form'>
              <div className='admin-name-get-container'>
                <div className='admin-student-little-detail'>
                  <h4>Name</h4>
                  <p>{user.name}</p>
                </div>
                <div className='admin-student-little-detail'>
                  <h4>Hobbies</h4>
                  {user['hobbies']?.length === 0 ? (
                    <p>User has no hobbies</p>
                  ) : (
                    user.hobbies?.map((hobb) => {
                      return <p>{hobb}</p>
                    })
                  )}
                </div>
              </div>

              <div className='admin-student-matric'>
                <div className='admin-student-little-detail'>
                  <h4>Matric no.</h4>
                  <p>{user.matricno}</p>
                </div>
                <div className='admin-student-little-detail'>
                  <h4>Level</h4>
                  {user.level && <p>{user.level}</p>}
                  {!user.level && <p>User has Level</p>}
                </div>
                <div className='admin-student-little-detail'>
                  <h4>Department</h4>
                  {user.department && <p>{user.department}</p>}
                  {!user.department && <p>User has no department</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        {openModal && <EditModal onClose={handleCloseModal} />}
      </div>
    )
}

export default StudentGetProfile;
