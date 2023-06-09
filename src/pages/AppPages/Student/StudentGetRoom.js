import React, { useContext, useState } from 'react';
import './StudentGetRoom.css'
import PrimaryButton from '../../../components/PrimaryButton';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
const apiUrl = 'https://vunafind.onrender.com'

function StudentGetRoom() {
    const authCtx = useContext(AuthContext)
    const { id } = useParams()
    console.log(id)
    const [matricNo, setMatricNo] = useState('');
  const [bedNo, setBedNo] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/api/v1/room/allocate`, {
        matricno:matricNo,
        roomNo: parseInt(roomNo),
        beds:parseInt(bedNo),
        hostelId: id, // Replace with the actual hostel ID
      }, {headers:{
        Authorization: `Bearer ${authCtx.userToken}`
      }});

      // Handle the response here (e.g., show success message)
      console.log(response.data.data);
      if(response.data){
        <form className='student-get-room-form-room' onSubmit={handleSubmit}>
        <div className='getroomInput'>
            <label>Matric No</label>
            <p></p>
        </div>
        <div className='getroomInput'>
            <label>Bed No</label>
            <p></p>
        </div>
        <div className='getroomInput'>
            <label>Room No</label>
            <p></p>
        </div>
        <div style={{display:'block'}}>
        <PrimaryButton type={'submit'} style={{margin:0}}>
            Submit
        </PrimaryButton>
        </div>
    </form>
      }
    } catch (error) {
      // Handle errors here (e.g., show error message)
      console.error(error);
    }
  };
    return (
        <div className='student-get-room-page'>
            <form className='student-get-room-form' onSubmit={handleSubmit}>
                <div className='getroomInput'>
                    <label>Matric No</label>
                    <input value={matricNo} onChange={(e) => setMatricNo(e.target.value)}/>
                </div>
                <div className='getroomInput'>
                    <label>Bed No</label>
                    <input value={bedNo} onChange={(e) => setBedNo(e.target.value)}/>
                </div>
                <div className='getroomInput'>
                    <label>Room No</label>
                    <input value={roomNo} onChange={(e) => setRoomNo(e.target.value)}/>
                </div>
                <div style={{display:'block'}}>
                <PrimaryButton type={'submit'} style={{margin:0}}>
                    Submit
                </PrimaryButton>
                </div>
            </form>
        </div>
    );
}

export default StudentGetRoom;
