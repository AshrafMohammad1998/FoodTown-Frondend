import React from 'react'
import navImage from "/image1.jpeg"

function Header() {
  return (
    <div className='flex justify-between items-center p-y-2 p-x-5 '>
      <img src={navImage} alt="" className='h-20 w-20'/>
    </div>
  )
}

export default Header