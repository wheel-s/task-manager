import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import edit from '../../assets/task-50.png'
import { Login, Register } from '../apis/authApi'


interface props{
  SetNav:React.Dispatch<React.SetStateAction<boolean>>
}
const Form:React.FC<props>  = ({SetNav})=> {
  const [logs, setlogs] = useState<string>('login') 
  const [userName, setuserName] = useState<string>("")
  const [email, setemail] = useState<string>("")
  const [password, setpassword] = useState<string>("")
  const [Msg, setMsg] = useState<any>()

 
  const register:string = JSON.stringify({username:userName, email:email, password:password})
  const login:string = JSON.stringify( {email:email, password:password})
  const navigate = useNavigate()
   async  function submitHandler(e:React.FormEvent){
        e.preventDefault()
  
          if(logs==='login'){  
            const data = await Login(login, setMsg,)
            if(data){
               localStorage.setItem('user',  JSON.stringify(data))
                setTimeout(() => {
                    SetNav(true)
                    navigate('/home')
                }, 1000);
            }
           
          } 
          
          if(logs==='signUp'){
            const data = await Register(register, setMsg,)
             if(data){
               localStorage.setItem('user',  JSON.stringify(data))
                setTimeout(() => {
                  SetNav(true)
                  navigate('/home')
                }, 1000);
             }
      
          } 
    
      setTimeout(() => {
        setemail('')
        setpassword('')
        setuserName('')
      },3000)
 
   }
  return (
    <div className='fixed z-2s
    0 items-center   h-full w-full  flex justify-center'>
    <div  className='flex  justify-center  text-white'>
      <div className='shadow-lg max-sm:bg-[hsla(0,0%,90%)] max-sm:shadow-none max-sm:ring-0 ring-2 bg-neutral-100 ring-stone-100 w-[25rem]  px-8 py-5 rounded-[15px] mb-10 max-md:w-[21rem]' >
      <div className='flex justify-center'>
        <h1 className='text-center  text-[1.5rem] max-sm:text-[1.3rem] max-sm:mb-  font-semibold text-gray-600 font-serif'>Welcome to Taskify 👾</h1>
        <img src={edit} alt={'remove'} width={40} className='mb- max-md:hidden'/>
      </div>
      <p className='text-center mb-5 tracking-wide font-sans text-sm text-gray-600'>please enter your details...🦅 </p>
      
      <form>
       {
        logs === 'signUp'&&(
        <>
        <label className='block  text-gray-800 '>UserName</label>
        <input type='text' placeholder='Enter your username' className='text-gray-900  rounded-md mb-2 w-full h-10 p-2 ring-1 ring-gray-400' value={userName} onChange={(e)=>{setuserName(e.target.value)}}/>
        
       </>)}
        <label className='block  text-gray-600 '>Email</label>
        <input type='text' placeholder='Enter your email'id='email' className='rounded-md  text-gray-900 bg-none w-full mb-2 h-10 p-2 ring-1 ring-gray-400' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        <label className='block mt-2 text-gray-800'>Password</label>
        <input type='password' placeholder='Enter your password' id='password' className='text-gray-900 bg-none  rounded-md w-full h-10 p-2 ring-1 ring-gray-400 ' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
       
        <input type='checkbox'className='rounded-md  w-6 h-4 bg- mt-5 mr-2 tbg-gray-100'  />
         <label className=' text-gray-600' >Remember me</label>
         <p className='text-center mt-3 text-red-500'>{Msg}</p>
         <div className='justify-center flex '> 
            <button id='login-button'className='w-full cursor-pointer flex my-4 rounded-lg bg-purple-900 px-[7rem] text-center py-1.75 text-[1.1rem] text-white' onClick={submitHandler}>{logs === 'login'?'Login':'SignUp'}</button>
         </div>
       
      </form>
      
       <p className='text-center text-gray-600'>{logs === 'login'?'Dont have an account' : 'Already have an account'}
         <span className='text-red-700 rounded-md ml-1 px-1 py-1 cursor-pointer' onClick={()=>logs === 'login' ?setlogs('signUp'):setlogs('login')}>{logs === 'login'? 'Sign-Up':'Login'}</span>
      </p>
      </div>
    </div>
    </div>
  )
}

export default Form
