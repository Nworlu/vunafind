import React, { useContext, useEffect, useState } from 'react'
import './AdminGetStudentProfile.css'
import { ArrowLeft } from 'iconsax-react'
import user5 from '../../../assets/user5.png'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'
const apiUrl = 'https://vunafind.onrender.com'

function AdminGetStudentProfile() {
  const { id } = useParams()
  const authCtx = useContext(AuthContext)
  const [student, setStudent] = useState()
    console.log(id)
    let navigate = useNavigate()
  useEffect(() => {
    async function getAUser() {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/user/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authCtx.userToken}`,
            },
          }
        )
        console.log(response.data.data)
        setStudent(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAUser()
  }, [authCtx.userToken, id])

  async function deleteStudentHandler() {
    try {
        const response = await axios.delete(
          `${apiUrl}/api/v1/user/deleteprofile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authCtx.userToken}`,
            },
          }
        )
        if (response) {
            alert('User has been deleted')
            navigate('/admin/manage-male-student')
        }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className='admin-manage-student-page-container'>
      <div className='admin-manage-student-detail-div'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ArrowLeft style={{ marginRight: 15 }} />
          <h2>Back to manage students</h2>
        </div>
        <div className='admin-get-profile-student-container'>
          <div className='admin-get-profile-student-pic'>
            <div className='admin-get-student-img-container'>
              <img src={user5} />
            </div>
            <button onClick={deleteStudentHandler}>Delete Student</button>
          </div>
          <div className='admin-get-student-detail-form'>
            <div className='admin-name-get-container'>
              <div className='admin-student-little-detail'>
                <h4>Name</h4>
                <p>{student?.name}</p>
              </div>
              <div className='admin-student-little-detail'>
                <h4>Hobbies</h4>
                {student?.hobbies?.length === 0 ? (
                  <p>Student has no hobbies</p>
                ) : (
                  <>
                    {student?.hobbies?.map((hobby) => {
                      return <p>{hobby}</p>
                    })}
                  </>
                )}
              </div>
            </div>

            <div className='admin-student-matric'>
              <div className='admin-student-little-detail'>
                <h4>Matric no.</h4>
                <p>{student?.matricno}</p>
              </div>
              <div className='admin-student-little-detail'>
                <h4>Level</h4>
                <p>{student?.level}lvl</p>
              </div>
              <div className='admin-student-little-detail'>
                <h4>Department</h4>
                <p>{student?.department}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminGetStudentProfile
