import React, { useContext, useEffect, useState } from 'react';
import './AdminGetProfile.css'
import { ArrowLeft } from 'iconsax-react';
import user5 from '../../../assets/user5.png'
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
function AdminGetProfile() {
const apiUrl = "https://vunafind.onrender.com";
    const authCtx = useContext(AuthContext)
    const [user, setUser] = useState({})
    const {id} = useParams()
    console.log(id)
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
    },[])
    function handleNavigation(){
        navigate('/admin/set-profile')
    }
    // console.log(user.hobbies.length < 0)
    return (
        <div className='admin-manage-student-page-container'>
            <div className='admin-manage-student-detail-div'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <ArrowLeft style={{marginRight: 15}} />
                {/* <h2>Back to manage students</h2> */}
                </div>
                <div className='admin-get-profile-student-container'>
                    <div className='admin-get-profile-student-pic'>
                        <div className='admin-get-student-img-container'>
                            <img src={user5}/>
                        </div>
                        <div>
                        {/* <button>Delete Student</button> */}
                        <button onClick={handleNavigation} >Edit Profile</button>
                        </div>
                    </div>
                    <div className='admin-get-student-detail-form'>
                        <div className='admin-name-get-container'>
                        <div className='admin-student-little-detail'>
                            <h4>Name</h4>
                            <p>{user.name}</p>
                        </div>
                        <div className='admin-student-little-detail'>
                            <h4>Hostel</h4>
                            {user['hostel']?.length === 0?<p>User has no hostel</p>:user.hostel?.map(hostel=>{
                                return <p>{hostel}</p>
                            })}
                        </div>
                        </div>

                        <div className='admin-student-matric'>
                        {/* <div className='admin-student-little-detail'>
                            <h4>Phone Number.</h4>
                            <p>{user.matricno}</p>
                        </div> */}
                        <div className='admin-student-little-detail'>
                            <h4>Email.</h4>
                            <p>{user.email}</p>
                        </div>
                        <div className='admin-student-little-detail'>
                            <h4>Type of Hostel.</h4>
                            {user['hostelCategory']?.length === 0?<p>User has no hostel Category</p>:user.hostelCategory?.map(hostCa=>{
                                return <p>{hostCa}</p>
                            })}
                        </div>
                        {/* <div className='admin-student-little-detail'>
                            <h4>Level</h4>
                            { user.level && <p>{user.level}</p>
                            }
                            { !user.level && <p>User has Level</p>
                            }
                        </div> */}
                        {/* <div className='admin-student-little-detail'>
                            <h4>Department</h4>
                            { user.department && <p>{user.department}</p>
                            }
                            { !user.department && <p>User has no department</p>
                            }
                        </div> */}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminGetProfile;
