import React from 'react'
import './Title.css'

function Title({children,style}) {
  return (
    <h1 style={style} className='title'>{children}</h1>
  )
}

export default Title