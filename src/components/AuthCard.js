import React from 'react'
import './AuthCard.css'

function AuthCard({children,style}) {
  return (
    <div className='authcard-div' style={style}>
       {children}
      </div>
  )
}

export default AuthCard
