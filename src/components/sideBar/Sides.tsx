import React from 'react'
import './side.scss'
import logout from '../../assets/logout.png'
import task from '../../assets/task-48.png'
import logo from '../../assets/task-100.png'
import settings from '../../assets/settings.png'
import division from '../../assets/folder.png'
import goal from '../../assets/mindset.png'
import arrow from '../../assets/next-button.png'
import { NavLink, useNavigate } from 'react-router-dom'

interface props{
  set:React.Dispatch<React.SetStateAction<boolean>>,
  cart:React.Dispatch<React.SetStateAction<string>>,
  categories:string[],
  setNav:React.Dispatch<React.SetStateAction<boolean>>,
}

const Sides:React.FC<props> = ({set, setNav, cart, categories,}) => {
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
    set(false)
    setNav(false)
    navigate('/')
      
  }
  return (
    <div className=' left fixed h-[100rem] bg-gray-200 rounded-lg w-[18rem] md:w-[22rem] ' >
      <img src={logo} alt={'img'} width={80} className='mt-4 ml-20' onClick={()=>set(false)}/>
      <section className='mt-[3.5em] ml-5 md:ml-8'>
        <NavLink  to={'/home'}className='flex' onClick={()=>set(false)}>
          <img src={task} alt={'img'} width={35} />
          <p className='mt-1 ml-2 text-[17px] text-[#3d3d5c] font-La Belle Aurore'>Tasks</p>
        </NavLink>
        <section className='' >
          <div className='flex mt-6 cursor-pointer'  onClick={show}>
             <img src={division} alt={'img'} width={28} className='ml-1'/>
             <p className='mt-2 ml-2 text-[17px] text-[#3d3d5c]'>categories</p>
             <img src={arrow} alt={'img'} width={30} height={20} className='rotate-[90deg] mt-1 ml-1'/>
          </div>
           <div className='ml-10 mt-2 cursor-pointer hide' id='id'>
              <p onClick={()=>{cart("")
                   set(false)}} className='text-[#3d3d5c]'><span className=' rounded-md mb-2 bg-blue-300 mr-1 px-[9px]'></span>All</p>
             {
              unique.map((item)=>{
                return(
                   <p onClick={()=>{cart(item)
                   set(false)}}><span className=' rounded-md mb-2 bg-blue-300 mr-1 px-[9px]'></span>{item}</p>
                )
              })
             }
             
           </div>
        </section>
         <NavLink to={'plans'} className='flex mt-6' onClick={()=>set(false)}>
           <img src={goal} alt={'img'} width={39} />
           <p className='mt-2 ml-2 text-[17px] text-[#3d3d5c]'>smart goals</p>
        </NavLink>
         <NavLink to={'settings'} className='flex mt-6'onClick={()=>set(false)}>
           <img src={settings} alt={'img'} width={33} />
           <p className='mt-1 ml-2 text-[17px] text-[#3d3d5c]'>settings</p>
        </NavLink>
      
       </section>
       <div className='flex mt-[3rem] mt-[7rem] ml-7 cursor-pointer' onClick={logOut} >
            <img src={logout} alt={'img'} width={28} />
            <p className='mt-2 ml-2 text-[17px] text-[#3d3d5c] '>Logout</p>
       </div>
    </div>
  )
}

export default Sides
