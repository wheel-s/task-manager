import React from 'react'
import remove from '../../assets/delete.png'
import edit from '../../assets/edit.png'


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
   <div className='animate'>
      <section className='flex justify-center mt-3 text-gray-600 '>
       
         <div className='flex'>
           <div className='bg-gray-400 py-[30px] h-[87px] rounded-[4px] w-[47px] '>
            <span  className={todo.completed? 'completed  top-5 ml-3  px-[12px] py-[3px] rounded-full ring-1 ring-slate-700':' ml-3  px-[12px] py-[3px] rounded-full ring-1 ring-slate-700'} id='don' onClick={()=>done(todo._id, todo.completed)} ></span>
           </div>    
        
          <div className= 'flex justify-between bg-gray-300 rounded-[5px] w-[30rem] px-5 py-1 max-md:w-[18rem]'>
            <div className={todo.completed? 'strike':'none'}>
              
             <p  >{todo.todo}</p>
             
             <p><span className=' rounded-full bg-blue-900 mr-1 px-[9px]'> </span>{todo.categoory}</p>
             <p>{todo.date}</p>

            </div>
            
             <div className=' flex mt-5'>
                <img src={edit} alt={'remove'} width={20} className='mr-3 h-6'onClick={()=>edits(todo._id)}/>
                <img src={remove} alt={'remove'} width={20} className='h-6 ml-3' id='remove' onClick={()=>ondelete(todo._id)}/>
             </div>
            </div>
    
          </div>
      
        </section>
      
    </div>
  )
}

export default single