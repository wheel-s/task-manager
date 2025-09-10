import React from 'react'
import settings from '../../assets/menu.png'

interface props{
  set:React.Dispatch<React.SetStateAction<boolean>>
}

const Header:React.FC<props> = ({set}) => {

  const users = localStorage.getItem('user')
  let name = 'welcone'
    if (users){
      const data = JSON.parse(users)
      name =data.user
    }
  return (
    <div className='mb-5'>
      <nav className='mt-5'>
        <img src={settings} alt={'img'} width={28} className='ml-5'  onClick={()=>set(true)}/>

      </nav>
      <h1 className=' text-center text-[#3d3d5c] text-xl mb-8 flex justify-end mr-10 mt-[-1.5rem]'>Welcome {name.charAt(0).toUpperCase()+name.slice(1)}</h1>
    </div>
  )
}

export default Header
