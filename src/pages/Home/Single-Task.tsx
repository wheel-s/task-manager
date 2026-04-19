import React from 'react'
import remove from '../../assets/delete.png'
import edit from '../../assets/edit.png'
import { FaCheck } from 'react-icons/fa'


interface props{
 todo:todo  
 ondelete(id:number):void
 done(id:number, completed:boolean):void
 edits(id:number):void
}
interface todo{
  _id:number,
  todo:string,
  categoory:string,
  date:String,
  completed:boolean
}

const single:React.FC<props> = ({todo, ondelete, done, edits}) => {


  return (
   <div 
   className='animate font-sans max-sm:text-[.9rem]  text-[.92rem]'>
      <section className='flex justify-center mt-3 text-gray-600 '>
       
         <div className='flex'>

        
          <div className= 'flex justify-between bg-white shadow-2xl rounded-[5px] w-[30rem] px-5 py-1 max-md:w-[20rem]'>
            
 
            <div className='flex gap-5'>

              {
                todo.completed ?
                <div className='justify-center  flex items-center'>
                  <FaCheck className='text-white cursor-pointer bg-teal-800 ring-teal500 justify-center bg--300 rounded-full h-6 p-[5px] w-6 ' onClick={()=>done(todo._id, todo.completed)}/>
                </div>
               :

                <div className='flex justify-center items-center'>
                  <p  className={todo.completed? 'h-5 cursor-pointer w-5  completd bg-green rounded-full  ring-[1.3px] ring-green-800':'h-5  w-5 rounded-full ring-[1.2px] cursor-pointer ring-amber-700'} id='don' onClick={()=>done(todo._id, todo.completed)} ></p>
                </div>
              }

              <div >
          
              <p  className={todo.completed? 'strike  ':'none w-49 md:w-89'}>{todo.todo}</p>
              <div className='flex'>

              </div>
              <div className={todo.completed? 'strike flex gap-1.5':'flex none gap-1.5'}>
           
                <p className='max-sm:text-[.82rem] text-[.9rem]'>{todo.categoory}
                   {/* <span className='px-2 font-extrabold text-[1.5rem] -mt-3'>.</span> */}
                </p>
                <span className={todo.completed ?' rounded-full  bg-teal-700  w-2 h-2 flex mt-[7px]':'rounded-full  bg-amber-700  w-2 h-2 flex mt-[7px] '}> </span>
             
              </div>
                  <p className={todo.completed?'max-sm:text-[.82rem] text-[.9rem] strike':'max-sm:text-[.82rem] text-[.9rem]'}>{todo.date}</p>
             

              </div>
            </div>
             <div className=' flex  items-center'>
                <img src={edit} alt={'remove'} width={20} className='mr- h-5'onClick={()=>edits(todo._id)}/>
                <img src={remove} alt={'remove'} width={20} className='h-5 ml-3' id='remove' onClick={()=>ondelete(todo._id)}/>
             </div>
            </div>
            
    
          </div>
      
        </section>
      
    </div>
  )
}

export default single