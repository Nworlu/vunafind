import React from 'react'
import './ChatSystem.css'
import PrimaryButton from '../../components/PrimaryButton'

const ChatSystem = () => {

  return (
    <>
      <div className='chat-system-conatiner'>
        <div className='chat-system-div'>f</div>
        <div className='chat-system-div-chat'>
          <div>
            
          </div>
        </div>
        <div className='chat-system-div'>
          <form className='chat-system-form'>
            <div className='chat-system-field'>
              <input />
            </div>
            <PrimaryButton style={{width:150, fontSize:15}}>
              Send Message
            </PrimaryButton>
            </form>
        </div>
      </div>
    </>
  )
}

export default ChatSystem
