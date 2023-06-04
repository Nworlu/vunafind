import React from 'react'
import './FlatButton.css'

function FlatButton({children,style, onClick}) {
  return (
    <button type='button' style={style} onClick={onClick} className='flat-button'>
    {children}
</button>
  )
}

export default FlatButton
