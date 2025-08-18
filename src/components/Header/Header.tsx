import React from 'react'
import settings from '../../assets/menu.png'

interface props{
  set:React.Dispatch<React.SetStateAction<boolean>>
}

const Header:React.FC<props> = ({set}) => {
  return (
    <div>
      <nav className='mt-5'>
        <img src={settings} alt={'img'} width={28} className='ml-5'  onClick={()=>set(true)}/>
      </nav>
    </div>
  )
}

export default Header
