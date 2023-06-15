import React, { useState } from 'react'
import PrimaryButton from './PrimaryButton'
import './GetRoomModal.css'
import { useNavigate } from 'react-router-dom'

const GetRoomModal = () => {
  const rooms = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  const beds = [0,1, 2, 3, 4]
  const [getRoom,setGetRoom] = useState()
  const [getBed, setGetBed] = useState()
  let navigate = useNavigate()
  function allocateRoom(e) {
    e.preventDefault()
    localStorage.setItem('roomAndBed', JSON.stringify({ RoomNumber: getRoom, bedSpace: getBed }))
    // setGenerated(true)
    alert('Generating room in progress......')
    localStorage.setItem('generated', 'true')
    alert('Generating room in progress......')

    
    alert('You have successfully be allocated a room')
    navigate('/student/get-room')
  }
  return (
    <>
      <div className='get-room-continer'>
        <div className='get-room-div'>
          <h3>SELECT DESIRED ROOM AND BED SPACE</h3>
          <form className='get-room-form' onSubmit={allocateRoom}>
            <div className='selectHolder'>
              <select
                value={getRoom}
                onChange={(e) => setGetRoom(e.target.value)}
              >
                {rooms.map((room) => {
                  return <option key={room} value={room}>{room}</option>
                })}
              </select>
            </div>
            <div className='selectHolder'>
              <select
                value={getBed}
                onChange={(e) => setGetBed(e.target.value)}
              >
                {beds.map((bed) => {
                  return <option key={bed} value={bed}>{bed}</option>
                })}
              </select>
            </div>
            <PrimaryButton style={{ width: 250, marginTop: 20 }}>
              Get room
            </PrimaryButton>
          </form>
        </div>
      </div>
    </>
  )
}

export default GetRoomModal
