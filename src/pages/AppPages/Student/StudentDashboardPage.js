import React, { useContext, useEffect, useState } from 'react'
import FlatButton from '../../../components/FlatButton'
import PrimaryButton from '../../../components/PrimaryButton'
import './StudentDashboardPage.css'
import hostelPic from '../../../assets/hostel.png'
import { AddCircle } from 'iconsax-react'
import axios from 'axios'
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const apiUrl = 'https://vunafind.onrender.com'

function StudentDashboardPage() {
  const authCtx = useContext(AuthContext)

  const [isGender,setIsGender] = useState([
    {
      id: 1,
      gender: 'Male',
      selected: true,
      hostel: 'Old hostel'
    },
    {
      id: 2,
      gender: 'Female',
      selected: false,
      hostel: 'New hostel'
    },
  ])
  let navigate = useNavigate()
  const [hostel, setHostel] = useState([]);
  const [isHostel,setIsHostel] = useState([
    {
      id: 1,
      hostel: 'Old hostel',
      selected: true,
    },
    {
      id: 2,
      hostel: 'New hostel',
      selected: false,
    },
  ])
  // const selectType = [
  //   {
  //     id: 1,
  //     gender: 'Male',
  //     selected: true,
  //   },
  //   {
  //     id: 2,
  //     gender: 'Female',
  //     selected: false
  //   },
  // ]

  useEffect(()=>{
    async function getHostels(){
      try {
        const response = await axios.get(`${apiUrl}/api/v1/hostel/hostels`, {
          headers:{
            Authorization: `Bearer ${authCtx.userToken}`
        }})
        console.log(response.data.hostels)
        setHostel(response.data.hostels)
      } catch (error) {
        console.log(error)
      }
    }
    getHostels()
  },[authCtx.userToken])

  function selectGender(gender){
    const updatedButtons = isGender.map((data) => {
      if ( data.id === gender) {
        return { ...data, selected: true };
      } else {
        return { ...data, selected: false };
      }
    });
      setIsGender(updatedButtons)
      console.log(updatedButtons)
  }
 function getFilteredHostels() {
   const selectedHostel = isGender.find((data) => data.selected)
   return hostel.filter(
     (h) => h.category === selectedHostel.gender
     // h.type === selectedHostel.type
   )
 }
  // function selectHostel(hostel){
  //   const updatedButtons = isHostel.map((data) => {
  //     if ( data.id === hostel) {
  //       return { ...data, selected: true };
  //     } else {
  //       return { ...data, selected: false };
  //     }
  //   });
  //     setIsHostel(updatedButtons)
  //     console.log(updatedButtons)
  // }
  return (
    <div className='student-dashboard-container'>
      <div className='student-dashboard-manage-hostel'>
        <h2>All Hostels</h2>
        <div className='student-dashboard-manage-buttons'>
          {isGender.map(data=>{
            return(
            <button type='button' style={{marginRight: 20, width: 150, height:40, border: '2px solid rgba(30, 82, 62, 1)'}} onClick={()=>selectGender(data.id)}  className={data.selected? 'active': 'inactive'}>
              {data.gender}
           </button>
            )
          })}
          {/* <PrimaryButton style={{marginRight: 20, width: 150, height:40}}>
            Old Hostel
          </PrimaryButton> */}
          {/* <FlatButton style={{marginRight: 20, width: 150, height:40, color:'rgba(30, 82, 62, 1)', border: '2px solid rgba(30, 82, 62, 1)'}}>
            New Hostel
          </FlatButton> */}
        </div>
      </div>
      <div className="student-dashboard-hostel-container">
        {getFilteredHostels().map((hostel) => (
          <div className="student-dashboard-hostel-div" onClick={(e)=>navigate(`/student/dashboard/hostel-details/${hostel._id}`)} key={hostel._id}>
            <div className="student-dashboard-hostel-img-container">
              <img src={hostel?.images?.[0]} alt="hostel-pic" />
              <div className="student-dashboard-available">
                <p></p>
                <span>{hostel.status}</span>
              </div>
            </div>
            <div className="student-dashboard-short-des">
              <span>{hostel.name}</span>
              <p>N {hostel.price}</p>
            </div>
          </div>
  ))}
  </div>





    </div>
  )
}

export default StudentDashboardPage
