import React from 'react'
import './AuthBackgroundImage.css'

function AuthBackgroundImage({children,style}) {
  return (
    <div className='intropage-container' style={style}>{children}</div>
  )
}

export default AuthBackgroundImage
