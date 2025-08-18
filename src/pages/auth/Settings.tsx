import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'




const Settings:React.FC = ()=> {
  const [userName, setuserName] = useState<string>("")
  const [email, setemail] = useState<string>("")
  const [password, setpassword] = useState<string>("")
  const [Msg, setMsg] = useState<any>()
  const user = localStorage.getItem('user')
 
  const register:string = JSON.stringify({username:userName, email:email, password:password})
  const navigate = useNavigate()
   function submitHandler(e:React.FormEvent){
        e.preventDefault()
   
      if(user){
          const data= JSON.parse(user)
         fetch(`http://localhost:5000/api/v1/user/${data.id}`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:register
            })
            .then(res=>{
              if (!res.ok){
                setMsg( res.json())
                setTimeout(() => {setMsg('')},5000);
              }
              return res.json()
            })
            .then((data)=>{
              localStorage.setItem('user',  JSON.stringify(data))
              setTimeout(() => {
                navigate('/home')
              }, 1000);
            
            }).catch(err=>{console.log(err)})
          }
      
          
      
 
    }
  return (
    <div  className='flex justify-center mt-[7rem]  max-md:mt-[4rem]'>
      <div className='ring-1 ring-slate-400 w-[25rem]  px-8 py-5 rounded-[15px] mb-10 max-md:w-[21rem]' >
      <div >
        <h1 className='text-center text-[1.5rem] text-gray-600 font-serif'>Edit your Profile 🦅</h1> 
      </div>
      <p className='text-center mb-5 mt-1 text-gray-600'>please enter your details... </p>
      
      <form>
      
        
        <label className='block  text-gray-600'>UserName</label>
        <input type='text' placeholder='Enter your username' className='rounded-md mb-2 w-full h-10 p-2 ring-1 ring-gray-400' value={userName} onChange={(e)=>{setuserName(e.target.value)}}/>
        
      
        <label className='block  text-gray-600'>Email</label>
        <input type='text' placeholder='Enter your email' className='ring-1 rounded-md w-full mb-2 h-10 p-2 ring-gray-400' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        <label className='block  text-gray-600'>Password</label>
        <input type='password' placeholder='Enter your password' className='rounded-md w-full h-10 p-2 ring-1 ring-gray-400' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>

         <p className='text-center mt-3 text-purple-500'>{Msg}</p>
        <button className=' my-4 rounded-lg bg-purple-900 px-[5rem]  py-2 text-white max-md:ml-[1.7rem] md:ml-[5rem] ' onClick={submitHandler}>EDIT</button>
      </form>
      
      </div>
    </div>
  )
}

export default Settings