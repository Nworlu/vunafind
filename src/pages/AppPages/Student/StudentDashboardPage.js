import React, { useEffect, useState } from 'react'
import FlatButton from '../../../components/FlatButton'
import PrimaryButton from '../../../components/PrimaryButton'
import './StudentDashboardPage.css'
import hostelPic from '../../../assets/hostel.png'
import { AddCircle } from 'iconsax-react'
import axios from 'axios'

const apiUrl = 'https://vunafind.onrender.com'

function StudentDashboardPage() {
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
  // const [isHostel,setIsHostel] = useState([
  //   {
  //     id: 1,
  //     hostel: 'Old hostel',
  //     selected: true,
  //   },
  //   {
  //     id: 2,
  //     hostel: 'New hostel',
  //     selected: false,
  //   },
  // ])
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
  const hostels =[
    {
      id:1,
      name:'Hostel A',
      price: '150,000',
      tag: 'old-hostel',
      status:'Available',
      gender: 'Male'
    },
    {
      id:2,
      name:'Hostel B',
      price: '160,000',
      tag: 'old-hostel',
      status:'Available',
      gender: 'Male'
    },
    {
      id:3,
      name:'Hostel C',
      price: '170,000',
      tag: 'old-hostel',
      status:'Available',
      gender: 'Male'
    },
    {
      id:4,
      name:'Hostel D',
      price: '140,000',
      tag: 'old-hostel',
      status:'Available',
      gender: 'Male'
    },
    {
      id:5,
      name:'Hostel E',
      price: '130,000',
      tag: 'old-hostel',
      status:'Available',
      gender: 'Male'
    },
    {
      id:6,
      name:'Hostel F',
      price: '120,000',
      tag: 'old-hostel',
      status:'Available',
      gender: 'Male'
    },
    {
      id:7,
      name:'Hostel G',
      price: '170,000',
      tag: 'old-hostel',
      status:'Available',
      gender: 'Male'
    },
    {
      id:8,
      name:'Hostel H',
      price: '140,000',
      tag: 'old-hostel',
      status:'Available',
      gender: 'Male'
    },
    {
      id:9,
      name:'Hostel I',
      price: '160,000',
      tag: 'old-hostel',
      status:'Available',
      gender: 'Male'
    },
    {
      id:10,
      name:'Pa-etos',
      price: '150,000',
      tag: 'old-hostel',
      status:'Available',
      gender: 'Female'
    },
    {
      id:11,
      name:'Cicl',
      price: '240,000',
      tag: 'old-hostel',
      status:'Available',
      gender: 'Female'
    },
    {
      id:12,
      name:'Stanzel',
      price: '140,000',
      tag: 'old-hostel',
      status:'Available',
      gender: 'Female'
    },
  ]
  useEffect(()=>{
    async function getHostels(){
      try {
        const response = await axios.get(`${apiUrl}/api/v1/hostel/hostels`, { headers:{

        }})
        console.log(response)
      } catch (error) {

      }
    }
    getHostels()
  },[])

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
  function getFilteredHostels(){
    const selectedHostel = isGender.find((data)=> data.selected)
    return hostels.filter((h)=>h.gender === selectedHostel.gender)
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
        <h2>Male Hostels</h2>
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
          <div className="student-dashboard-hostel-div" key={hostel.id}>
            <div className="student-dashboard-hostel-img-container">
              <img src={hostelPic} alt="hostel-pic" />
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
