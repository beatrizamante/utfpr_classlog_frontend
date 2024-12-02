import React from 'react'
import logo from '../assets/images/utfpr_logo.png'
import { ReactComponent as MenuIcon } from '../assets/icons/Vector.svg'

export default function Header() {
  return (
    <div className='h-[105px] w-full bg-utfpr_dark_gray flex flex-row justify-between px-4'>
        <img src={logo} alt='Logo' className='w-[180px] h-[85px] pt-4'/>
        <button>
          <MenuIcon/>
        </button>
    </div>
  )
}
