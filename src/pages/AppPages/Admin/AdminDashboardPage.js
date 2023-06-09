import React, { useContext, useEffect, useState } from 'react'
import FlatButton from '../../../components/FlatButton'
import PrimaryButton from '../../../components/PrimaryButton'
import './AdminDashboardPage.css'
import hostelPic from '../../../assets/hostel.png'
import { AddCircle } from 'iconsax-react'
import axios from 'axios'
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const apiUrl = 'https://vunafind.onrender.com'

function AdminDashboardPage() {
  const authCtx = useContext(AuthContext)
  const [isHostel, setIsHostel] = useState([
    {
      id: 1,
      hostel: 'Old hostel',
      gender: 'Male',
      type: 'old',
      selected: true,
    },
    {
      id: 2,
      hostel: 'New hostel',
      gender: 'Female',
      type: 'new',
      selected: false,
    },
  ]);
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
  const [hostel, setHostel] = useState([]);
  useEffect(() => {
    async function getHostels() {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/hostel/hostels`, {
          headers: {
            Authorization: `Bearer ${authCtx.userToken}`,
            'Content-Type': 'application/json',
          },
        })
        setHostel(response.data.hostels)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    getHostels()
  }, [authCtx.userToken])
let navigate = useNavigate()
  function handleNav(){
    navigate('/admin/add-hostel')
  }

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
  // function selectHostel(hostelId) {
  //   const updatedButtons = isHostel.map((data) => {
  //     if (data.id === hostelId) {
  //       return { ...data, selected: true };
  //     } else {
  //       return { ...data, selected: false };
  //     }
  //   });
  //   setIsHostel(updatedButtons);
  //   console.log(updatedButtons);
  // }

  function getFilteredHostels() {
    const selectedHostel = isGender.find((data) => data.selected);
    return hostel.filter(
      (h) =>
        h.category === selectedHostel.gender
        // h.type === selectedHostel.type
    );
  }

  return (
    <div className='admin-dashboard-container'>
      <div className='admin-dashboard-manage-hostel'>
        <h2>Manage Hostels</h2>
        <div className='admin-dashboard-manage-buttons'>
        {isGender.map(data=>{
            return(
            <button type='button' style={{marginRight: 20, width: 150, height:40, border: '2px solid rgba(30, 82, 62, 1)'}} onClick={()=>selectGender(data.id)}  className={data.selected? 'active': 'inactive'}>
              {data.gender}
           </button>
            )
          })}

          {/* <FlatButton style={{marginRight: 20, width: 150, height:40,color:'rgba(30, 82, 62, 1)', border: '2px solid rgba(30, 82, 62, 1)'}}>
            Female
          </FlatButton> */}
        </div>

      </div>
      <div className='admin-dashboard-hostel-container'>
      {getFilteredHostels().map((hostel) => (
          <div className="student-dashboard-hostel-div" onClick={(e)=>navigate(`/admin/dashboard/hostel-details/${hostel._id}`)} key={hostel._id}>
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
      <div style={{position: 'fixed', bottom: '4%', right: '4%', width: '80px', height: '80px'}}>
      <PrimaryButton onClick={handleNav} style={{borderRadius: '50%',width: '100%', height: '100%'}} >
        <AddCircle className='icon-add'/>
      </PrimaryButton>
      </div>
    </div>
  )
}

export default AdminDashboardPage
