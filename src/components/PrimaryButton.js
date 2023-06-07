import React from 'react'
import './PrimaryButton.css'

function PrimaryButton({children,style, onClick,className,type}) {
  return (
    <button type={type} style={style} onClick={onClick} className='primary-button'>
        {children}
    </button>
  )
}

export default PrimaryButton
