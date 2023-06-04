import React from 'react'
import './AuthCard.css'

function AuthCard({children}) {
  return (
    <div className='authcard-div'>
       {children}
      </div>
  )
}

export default AuthCard