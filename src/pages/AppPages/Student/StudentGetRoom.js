import React, { useContext, useEffect, useState } from 'react';
import './StudentGetRoom.css'
import PrimaryButton from '../../../components/PrimaryButton';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
const apiUrl = 'https://vunafind.onrender.com'

function StudentGetRoom() {
    const authCtx = useContext(AuthContext)
    // const { id } = useParams()
    // console.log(id)
    const [matricNo, setMatricNo] = useState('');
  const [bedNo, setBedNo] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [generated, setGenerated] = useState(false)



  useEffect(() => {
    const storedGenerated = localStorage.getItem('generated');
    const roomAndBed = JSON.parse(localStorage.getItem('roomAndBed'))
    if (storedGenerated === 'true') {
      setGenerated(true);
    }
      setBedNo(roomAndBed?.bedSpace)
      setRoomNo(roomAndBed?.RoomNumber)
      console.log(roomAndBed)
  }, []);


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setGenerated(true);
//     alert('Generating room in progress......')
//     localStorage.setItem('generated', 'true');
//     alert('Generating room in progress......');
//   };
    return (
        <div className='student-get-room-page'>
            {roomNo && generated ? (
                <section className='student-get-room-form-room'>
                    <h3>Your Bed space and Room number has been generated</h3>
        {/* <div className='getroomInput'>

            <label>Matric No</label>
            <p>{matricNo}</p>
        </div> */}
        <div className='getroomInput'>
            {/* <label>Bed No</label> */}
            <p>Bed Number: {bedNo}</p>
        </div>
        <div className='getroomInput'>
            {/* <label>Room No</label> */}
            <p>Room Number: {roomNo}</p>
        </div>
        <div style={{display:'block'}}>
        {/* <PrimaryButton type={'submit'} style={{margin:0}}>
            Submit
        </PrimaryButton> */}
        </div>
    </section>
            ):(
                <form className='student-get-room-form'>
              <h3>No room number and bed space has been allocated to you yet</h3>
            </form>
            )}
        </div>
    );
}

export default StudentGetRoom;
