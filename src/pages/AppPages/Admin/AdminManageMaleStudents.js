import React, { useContext, useEffect, useState } from 'react'
import './AdminManageMaleStudents.css'
import user4 from '../../../assets/user4.png'
import axios from 'axios'
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const apiUrl = 'https://vunafind.onrender.com'
function AdminManageMaleStudents() {
  const authCtx = useContext(AuthContext)
  const [students, setStudents] = useState([])
  let navigate = useNavigate()
  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/user/allusers`, {
          headers: {
            Authorization: `Bearer ${authCtx.userToken}`,
          },
        })
          setStudents(response.data.data)
          console.log(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllUsers()
  }, [authCtx.userToken])
  const student = students.filter((student) => {
    return student.role === 'Student'
  })
  return (
    <div className='admin-manage-student-page-container'>
      <div className='admin-manage-student-detail-div'>
        <h2>Manage Students</h2>
        <div className='admin-manage-student-container'>
          {student.map((stu) => {
            return (
              <div
                className='admin-manage-student-div'
                onClick={() =>
                  navigate(`/admin/get-student-profile/${stu._id}`)
                }
                key={stu._id}
              >
                <div className='admin-manage-student-detail'>
                  <div className='admin-manage-student-inner'>
                    <img src={user4} />
                  </div>
                  <div className='admin-maange-info-student'>
                    <h3>{stu.name}</h3>
                    <p>{stu.matricno}</p>
                    <p>{stu.level}lvl</p>
                  </div>
                </div>
              </div>
            )
          })}

          {/* <div className='admin-manage-student-div'>
                        <div className='admin-manage-student-detail'>
                            <div className='admin-manage-student-inner'>
                                <img src={user4}/>
                            </div>
                           <div className='admin-maange-info-student'>
                            <h3>Leon Azeez</h3>
                            <p>Vug/csc/19/3347</p>
                            <p>400lvl</p>
                           </div>
                        </div>
                    </div>
                    <div className='admin-manage-student-div'>
                        <div className='admin-manage-student-detail'>
                            <div className='admin-manage-student-inner'>
                                <img src={user4}/>
                            </div>
                           <div className='admin-maange-info-student'>
                            <h3>Leon Azeez</h3>
                            <p>Vug/csc/19/3347</p>
                            <p>400lvl</p>
                           </div>
                        </div>
                    </div>
                    <div className='admin-manage-student-div'>
                        <div className='admin-manage-student-detail'>
                            <div className='admin-manage-student-inner'>
                                <img src={user4}/>
                            </div>
                           <div className='admin-maange-info-student'>
                            <h3>Leon Azeez</h3>
                            <p>Vug/csc/19/3347</p>
                            <p>400lvl</p>
                           </div>
                        </div>
                    </div>
                    <div className='admin-manage-student-div'>
                        <div className='admin-manage-student-detail'>
                            <div className='admin-manage-student-inner'>
                                <img src={user4}/>
                            </div>
                           <div className='admin-maange-info-student'>
                            <h3>Leon Azeez</h3>
                            <p>Vug/csc/19/3347</p>
                            <p>400lvl</p>
                           </div>
                        </div>
                    </div>
                    <div className='admin-manage-student-div'>
                        <div className='admin-manage-student-detail'>
                            <div className='admin-manage-student-inner'>
                                <img src={user4}/>
                            </div>
                           <div className='admin-maange-info-student'>
                            <h3>Leon Azeez</h3>
                            <p>Vug/csc/19/3347</p>
                            <p>400lvl</p>
                           </div>
                        </div>
                    </div>
                    <div className='admin-manage-student-div'>
                        <div className='admin-manage-student-detail'>
                            <div className='admin-manage-student-inner'>
                                <img src={user4}/>
                            </div>
                           <div className='admin-maange-info-student'>
                            <h3>Leon Azeez</h3>
                            <p>Vug/csc/19/3347</p>
                            <p>400lvl</p>
                           </div>
                        </div>
                    </div>
                    <div className='admin-manage-student-div'>
                        <div className='admin-manage-student-detail'>
                            <div className='admin-manage-student-inner'>
                                <img src={user4}/>
                            </div>
                           <div className='admin-maange-info-student'>
                            <h3>Leon Azeez</h3>
                            <p>Vug/csc/19/3347</p>
                            <p>400lvl</p>
                           </div>
                        </div>
                    </div> */}
        </div>
      </div>
    </div>
  )
}

export default AdminManageMaleStudents
