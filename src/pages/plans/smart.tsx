import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';





interface convert{
  role:string,
  parts:[{
    text:string
  }]
}
interface props{

  setdetails:React.Dispatch<React.SetStateAction<string[][]>>
}

const Smart:React.FC<props> = ({ setdetails}) => {
     const train=
      `you are an expert goal-setting coach. Your task is to help the user refine their initial
      goal into a SMART goal(Specific, Measurable, Achievable, Relevant, Time-bound).
      
      You will have a structured conversational flow. Do not provide all the questions
      at once. Ask the questions one at a time, and wait for the user's response
      before asking the next.

      `
     const model:convert ={role:'model', parts:[{text:train}]}
    const [input, setinput] = useState<string>("")
  
    const [msg, setmsg] = useState<string[]>([])
    const [responses, setresponses] = useState<string[]>([])
    const [conversation, setconverstion] = useState<convert[]>([model])
  

 
    const Start = async()=>{


        setmsg([...msg, input ])
        
      
        setinput('')
        const user:convert ={role:'user', parts:[{text:input}]}
        const  updatedCon:convert[]=[...conversation, user]
        setconverstion(updatedCon)

       
         try{
           const goal = JSON.stringify({name:updatedCon})
          const response = await  
            fetch(`http://localhost:5000/api/v1/model/chat`,{
              method:'POST',
              headers:{'Content-Type':'application/json'}, 
              body:goal
            })

          const data = await response.json()
          setresponses([...responses, data])
          const aiM:convert ={role:'model', parts:[{text:data}]}
          setconverstion(prev=>[...prev, aiM ])
          setdetails([msg, responses])
      }catch(err){
        console.log(err)
      }
    
    
  }
    
  return (
    <div>

      <div className='grid justify-center mt-10'>
      
          <div  className='' >
           {msg.map((item)=>{return( <p  className='bg-gray-400 w-[17rem] rounded-md p-3 mb-5 ring-[1px] ring-slate-600'>{item}</p>)})}
          </div>
         <input className='rounded-md mb-2 w-[16rem] h-10 p-2 ring-[1.3px] ring-slate-900' value={input} onChange={(e)=>setinput(e.target.value)  }/>
      </div>


      <div className='grid justify-center mt-5'>
       <p className='mb-5 text-[1.1em] text-[#3d3d5c] '>Turn your goals into attainable plans</p> 
       <button className='bg-gray-800 rounded-lg px-20 py-[5px] text-white text-xl cursor-pointer' onClick={Start}>Start</button>
       
      </div>
    
     <div className='grid justify-center mt-5'>
      
          <div  className='show' >
           {responses.map((w)=>{return( <p className='bg-blue-300 w-[17rem] rounded-md p-3 mb-5 text-[.9rem] ring-[1px] ring-slate-600 show'>{w}</p>)})}
          </div>
       
      </div>
       <div className='grid justify-center '>

        <Link to='/details' className=' mb-3 ml-40 text-end text-blue-800 underline cursor-pointer' >See plan details</Link>
       </div>
      
    </div>


  )
}

export default Smart
