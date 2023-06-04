import React from 'react'
import './PrimaryButton.css'

function PrimaryButton({children,style, onClick,className}) {
  return (
    <button type='button' style={style} onClick={onClick} className='primary-button'>
        {children}
    </button>
  )
}

export default PrimaryButton
