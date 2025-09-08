import React from 'react'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
interface props{
  details:string[][],


}

const Details:React.FC<props> = ({details}) => {
 const [responses, setresponses] = useState<string>()

  

    const getDetails = async()=>{
      try{
        const goal = JSON.stringify({name:details})
            const response = await  
              fetch(`https://task-backend-rosy.vercel.app/api/v1/model/details`,{
              method:'post',
              headers:{'Content-Type':'application/json'}, 
              body:goal
            })

        const data = await response.json()
        setresponses(data)
      }catch(err){
        console.log(err)
      }
    }

    
    useEffect(()=>{
      getDetails()
    },[details])
  

  return (
    <div>

       <div  className='p-4 mt-5 text-center mb-9 show' >
         <ReactMarkdown >{responses}</ReactMarkdown>
       </div>

    </div>
  )
}

export default Details
