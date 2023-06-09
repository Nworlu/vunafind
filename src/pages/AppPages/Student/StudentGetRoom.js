import React, { useContext, useEffect, useState } from 'react';
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
  const [generated, setGenerated] = useState(false)



  useEffect(() => {
    const storedGenerated = localStorage.getItem('generated');
    if (storedGenerated === 'true') {
      setGenerated(true);
    }
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setGenerated(true);
    alert('Generating room in progress......')
    localStorage.setItem('generated', 'true');
    alert('Generating room in progress......');
    // try {
    //   const response = await axios.post(`${apiUrl}/api/v1/room/allocate`, {
    //     matricno:matricNo,
    //     roomNo: parseInt(roomNo),
    //     beds:parseInt(bedNo),
    //     hostelId: id,
    //   }, {headers:{
    //     Authorization: `Bearer ${authCtx.userToken}`
    //   }});

    //   console.log(response.data.data);
    //   if(response.data){

    //    return  <form className='student-get-room-form-room' onSubmit={handleSubmit}>
    //     <div className='getroomInput'>
    //         <label>Matric No</label>
    //         <p>Vug/csc/22/7209</p>
    //     </div>
    //     <div className='getroomInput'>
    //         <label>Bed No</label>
    //         <p>Bed Number 3</p>
    //     </div>
    //     <div className='getroomInput'>
    //         <label>Room No</label>
    //         <p>Room Number 2</p>
    //     </div>
    //     <div style={{display:'block'}}>
    //     <PrimaryButton type={'submit'} style={{margin:0}}>
    //         Submit
    //     </PrimaryButton>
    //     </div>
    // </form>
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };
    return (
        <div className='student-get-room-page'>
            {generated ? (
                <form className='student-get-room-form-room' onSubmit={handleSubmit}>
        <div className='getroomInput'>

            <label>Matric No</label>
            <p>{matricNo}</p>
        </div>
        <div className='getroomInput'>
            {/* <label>Bed No</label> */}
            <p>Bed Number {bedNo}</p>
        </div>
        <div className='getroomInput'>
            {/* <label>Room No</label> */}
            <p>Room Number {roomNo}</p>
        </div>
        <div style={{display:'block'}}>
        {/* <PrimaryButton type={'submit'} style={{margin:0}}>
            Submit
        </PrimaryButton> */}
        </div>
    </form>
            ):(
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
            )}
            {/* <form className='student-get-room-form' onSubmit={handleSubmit}>
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
            </form> */}
        </div>
    );
}

export default StudentGetRoom;
