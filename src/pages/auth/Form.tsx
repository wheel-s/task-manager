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
    <div  className='flex justify-center mt-[7rem]  max-md:mt-[4rem]'>
      <div className='shadow-lg ring-2 bg-neutral-100 ring-stone-100 w-[25rem]  px-8 py-5 rounded-[15px] mb-10 max-md:w-[21rem]' >
      <div className='flex '>
        <h1 className='text-center text-[1.5rem] text-gray-600 font-serif'>Welcome to Task-Manager 👾</h1>
        <img src={edit} alt={'remove'} width={40} className='mb-10'/>
      </div>
      <p className='text-center mb-5 mt-1 text-gray-600'>please enter your details...🦅 </p>
      
      <form>
       {
        logs === 'signUp'&&(
        <>
        <label className='block  text-gray-600'>UserName</label>
        <input type='text' placeholder='Enter your username' className='rounded-md mb-2 w-full h-10 p-2 ring-1 ring-gray-400' value={userName} onChange={(e)=>{setuserName(e.target.value)}}/>
        
       </>)}
        <label className='block  text-gray-600'>Email</label>
        <input type='text' placeholder='Enter your email'id='email' className='rounded-md w-full mb-2 h-10 p-2 ring-1 ring-gray-400' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        <label className='block  text-gray-600'>Password</label>
        <input type='password' placeholder='Enter your password' id='password' className='rounded-md w-full h-10 p-2 ring-1 ring-gray-400' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
       
        <input type='checkbox'className='rounded-md w-6 h-4  mt-5 mr-2 tbg-gray-100'  />
         <label className=' text-gray-600' >Remember me</label>
         <p className='text-center mt-3 text-purple-500'>{Msg}</p>
        <button id='login-button'className=' flex my-4 rounded-lg bg-purple-900 px-[5rem]  py-2 text-white max-md:ml-[1.7rem] md:ml-[5rem] ' onClick={submitHandler}>{logs === 'login'?'Login':'SignUp'}</button>
      </form>
      
       <p className='text-center text-gray-600'>{logs === 'login'?'Dont have an account' : 'Already have an account'}
         <span className='text-red-700 rounded-md ml-1 px-1 py-1 cursor-pointer' onClick={()=>logs === 'login' ?setlogs('signUp'):setlogs('login')}>{logs === 'login'? 'Sign-Up':'Login'}</span>
      </p>
      </div>
    </div>
  )
}

export default Form
