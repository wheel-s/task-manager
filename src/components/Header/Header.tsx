import React from 'react'
import setting from '../../assets/settings.png'


//headers

import '../Header/header.scss'
import logout from '../../assets/logout.png'
import task from '../../assets/task-48.png'
import logo from '../../assets/task-100.png'
import division from '../../assets/folder.png'
import goal from '../../assets/mindset.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaBars, FaChevronDown } from 'react-icons/fa'
import { useCategory } from '../CategoryContext'
import { useCategories } from '../CategoriesContex'












interface props{
  setNav:React.Dispatch<React.SetStateAction<boolean>>,
}

const Header:React.FC<props> = ({setNav, }) => {
 const [sidebar, setsideBar]= useState(false)
 const {setCategory} = useCategory()
 const {categories} = useCategories()
  const users = localStorage.getItem('user')
  let name = 'welcome'
    if (users){
      const data = JSON.parse(users)
      name =data.user
    }







    //headers
     const navigate = useNavigate()
  const show=():void=>{
    const id = document.querySelector('#id')
    id?.classList.toggle('show')
    
  }
 
  const unique = categories.filter((name, index, self)=>{
    return self.indexOf(name)===index
  })
  
  const logOut =():void=>{
    localStorage.setItem('user', "")
    setsideBar(false)
    setNav(false)
    navigate('/')
      
  }


  return (
    <div>
      <div className='mb-5 font-sans'>
        <nav className='mt-7'>
          {/* <img src={settings} alt={'img'} width={28} className='ml-5 z-20'  onClick={()=>setsideBar(true)}/> */}
          <FaBars size={20} className='ml-7 scale-x-195 scale-y-105 font-light text-[hsl(240,20%,0%)] ' onClick={()=>setsideBar(true)}/>
        </nav>
        <h1 className=' text-center font-serif font-semibold text-[#3d3d5c] text-lg mb-10 flex justify-end mr-5 mt-[-1.2rem] '>Welcome {name.charAt(0).toUpperCase()+name.slice(1)}</h1>

      </div>


    {
      sidebar &&
      
      <div className=' left top-2 z-10 font-sans tracking-wide max-sm:text-[.98rem] text-[1rem] font- fixed h-[100rem]  bg-gray-300 rounded-lg w-[18rem] md:w-[22rem] ' >
      <img src={logo} alt={'img'} width={80} className='mt-4 ml-20' onClick={()=>setsideBar(false)}/>
      <section className='mt-[3.5em] ml-5 md:ml-8'>
        <NavLink  to={'/home'}className='flex' onClick={()=>setsideBar(false)}>
          <img src={task} alt={'img'} width={35} />
          <p className='mt-1 ml-2  text-[hsl(240,20%,30%)] '>Tasks</p>
        </NavLink>
        <section className='' >
          <div className='flex mt-6 cursor-pointer'  onClick={show}>
             <img src={division} alt={'img'} width={28} className='ml-1 '/>
             <p className='mt-2 ml-2 text-[hsl(240,20%,30%)]'>categories</p>
             <FaChevronDown className='mt-[.8rem] ml-2'/>

          </div>
           <div className='ml-10   mt-16 cursor-pointer hide' id='id'>
            <Link to={'/home'}>
                  <p  onClick={()=>{setCategory("")
                  setsideBar(false)}} className='text-[#3d3d5c] mb-1.5 text-[.9rem]'><span className=' rounded-md bg-blue-300 mr-1 px-[9px]'></span>all</p>
            </Link>

             {
              unique.map((item)=>{
                return(
                  <Link to={'/home'} key={item} >
                                     <p className="mb-1.5 text-[.9rem]" onClick={()=>{setCategory(item) 
                   setsideBar(false)}}><span className=' rounded-md bg-blue-300 mr-1 px-[9px]'></span>{item}</p>
                  </Link>

                )
              })
             }
             
           </div>
        </section>
         <NavLink to={'plans'} className='flex mt-[2rem]' onClick={()=>setsideBar(false)}>
           <img src={goal} alt={'img'} width={39} />
           <p className='mt-2 ml-2  text-[#3d3d5c]'>smart goals</p>
        </NavLink>
         <NavLink to={'settings'} className='flex mt-6'onClick={()=>setsideBar(false)}>
           <img src={setting} alt={'img'} width={33} />
           <p className='mt-1 ml-2  text-[#3d3d5c]'>settings</p>
        </NavLink>
      
       </section>
       <div className='flex  mt-[7rem] ml-7 cursor-pointer' onClick={logOut} >
            <img src={logout} alt={'img'} width={28} />
            <p className='mt-2 ml-2  text-[#3d3d5c] '>Logout</p>
       </div>
    </div>
    }
    </div>



  )
}

export default Header
