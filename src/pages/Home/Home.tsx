
import { useState, useEffect } from 'react'
import { addTask, deleteTask, editTask,  showTask, showTaskCategory } from '../apis/homeApi'
import Single from './Single-Task'
import Create from '../Add/Create'

import { useData } from '../../components/AddContext'
import { FaCheck} from 'react-icons/fa'
import { BiSolidHourglass } from 'react-icons/bi'
import { useCategory } from '../../components/CategoryContext'
import { useCategories } from '../../components/CategoriesContex'

interface props{

}

interface todo{
  _id:number,
  todo:string,
  categoory:string,
  date:String,
  completed:boolean
}


const Home: React.FC<props>= () => {

  const {addTaskModal,setaddTaskModal} = useData()
  const {category} = useCategory()
  const {setCategories} = useCategories()


    const [Tasks, setTasks] = useState<todo[]>([])
    const [change, setchange] = useState<string>("add")
    const users = localStorage.getItem('user')

    
    const notDone=async():Promise<void>=>{
      
       if(category!=="" && users){
         const data= JSON.parse(users)
         const taskCategory = await showTaskCategory(category, data.token)
         if(taskCategory){
           setTasks(taskCategory.filter((task:todo)=>task.completed ==false))
          } 
       }
        
     else if(users){
        const data= JSON.parse(users)
        const allTasks = await showTask(data.token)
          if(allTasks){
            setTasks(allTasks.filter((task:todo)=>task.completed ==false))
          } 
      }
     
    }

    const completed = async():Promise<void>=>{

       if(category!=="" && users){
         const data= JSON.parse(users)
         const taskCategory = await showTaskCategory(category, data.token)
         if(taskCategory){
           setTasks(taskCategory.filter((task:todo)=>task.completed ==true))
          } 
       }
        
     else if(users){
        const data= JSON.parse(users)  
        const allTasks = await showTask(data.token)
          if(allTasks){
            setTasks(allTasks.filter((task:todo)=>task.completed ==true))
          } 
      }
     
    }
    const All = ():void=>{
      if(category!=="" && users){
        categoryy()
      }
      else{
        showTasks()
      }
    
    }
    const categoryy = async():Promise<void>=>{
       if(category!=="" && users){
        
        const data= JSON.parse(users)
        const taskCategory = await showTaskCategory(category, data.token)
        if(taskCategory){
          setTasks(taskCategory)
        }  
    
     }
      
    }
    const showTasks=async():Promise<void>=>{
     
     if(users){
        const data= JSON.parse(users)
        const show = await showTask(data.token)
          if(show){
            setTasks(show)     
            setCategories(show.map(item=>String(item.categoory.toLowerCase())))
          }    
            
        // console.log(show[0].categoory)
       
     }
   

   }

   useEffect(()=>{
      if(category!==""){
        categoryy()
      }
      else{
       showTasks()
       setCategories(Tasks.map(Task=>Task.categoory.toLowerCase()));
      }
    },[category])

   
  const handleAdd =async( task:todo):Promise<void>=>{
  
      if(users){
        const data= JSON.parse(users)
        const value = JSON.stringify({todo:task.todo, categoory:task.categoory, completed:task.completed})
 
        const create = await addTask(value, data.token)
          if(create){
            if(category!=="" && users){
              categoryy()
            }else{showTasks()}
          }
       
      }
  }
  const handleDelete = async(id:number):Promise<void>=>{

      if(users){
        const data= JSON.parse(users)
        const taskDelete = await deleteTask(id, data.token)
          if(taskDelete){
            if(category!=="" && users){
              categoryy()
            }else{showTasks()}
          }  
            
    }

 }
 
  const done = async(id:number, completed:boolean):Promise<void>=>{
      const value = JSON.stringify({ completed:!completed})

      if(users){
          const data= JSON.parse(users)
          const complete = await editTask(id, data.token, value)
          if(complete){
            if(category!=="" && users){
              categoryy()
            }else{showTasks()}
          }  
      
      }
    
  }
  const edit =(id:number):void=>{
    setaddTaskModal(true)
    setchange("edit")
    localStorage.setItem('id', JSON.stringify({id}))
  }
  const edits= async(task:todo):Promise<void>=>{
      const value = JSON.stringify({todo:task.todo, categoory:task.categoory, completed:task.completed})
      const Id = localStorage.getItem('id')
      
      if(users){
        const data= JSON.parse(users)
          if(Id){
            const _id =JSON.parse(Id)
            const{id}= _id
            const edit= await editTask(id, data.token, value)
              if(edit){
                if(category!=="" && users){
                  categoryy()
                }else{showTasks()}
              }   
          }
     }
   
  }

  


 return (
    <div>
      
      <h1 className=' text-center text-[#3d3d5c] font-serif text-2xl font-semibold  tracking-wide'>Today</h1>
      <p className='text-center text-stone-500 font-sans text-[.83rem] tracking-wide'>Fri, April 20</p>

      <div className='flex font-sans max-sm:text-[.88rem]   text-[.93rem] justify-center mt-5'>
        <div className='bg-white flex gap-4 shadow-2xl w-75 md:w-100 py-2 rounded-md'>
          <p></p>
          <div className='flex gap-1.5 '>
            <FaCheck className='text-white mt-[.24rem]  bg-blue-900 rounded-full h-4 p-0.75 w-4 '/>
            <p>3 Done</p>
          </div>
          <div className='flex gap-1.5'>
            <BiSolidHourglass className='mt-0.75 text-[1.05rem] text-slate-600'/>
            <p>2 Pending</p>
          </div>
          
          <div className='flex justify-end md:ml-20 '>
            <p className='text-end ml-20 max-md:ml-16.5 font-bold font-sans text-md -mt-[1px] scale-y-155'>{'>'}</p>
          </div>

        </div>
      </div>

      <div className='flex justify-center mb-8 mt-5 font-sans max-sm:text-[.9rem] tracking-tight text-[.93rem]'>
         {/* <h1 className='ml-5 text-xl text-[#3d3d5c]'>Tasks</h1> */}
         <div className='flex justify-around mr-1 tracking-wide bg-gray-300  rounded-sm h-9 py-1.5 w-65'>
          <p className=' px-3 active1  text-gray-700   text-[.979rem] font-sans cursor-pointer ' onClick={All}>All</p>
          <p className=' rounded-md  h-6  text-gray-600 cursor-pointer ' onClick={completed}>Done</p>
          {/* <p className='text-black hidden '>|</p> */}
          <div className='justify-end  '>
              <p className=' rounded-md  text-end  text-gray-600 cursor-pointer ' onClick={notDone}>Pending</p>
          </div>
          
         </div>
      </div>

 
        { Tasks.map((item)=>{return(
          <div key={item._id}>
          <Single  todo={item} ondelete={ handleDelete} done={done} edits={edit}/></div>)})}
      

      
     
  
      
      <section className='flex justify-center md:ml-100 ml-60 cursor-pointer mt-10 mb-10 animate' onClick={()=>{setaddTaskModal(true)
       setchange("add")}}>
        <div className='flex justify-center  bg-cyan-900 rounded-full h-10 w-10 shadow-xl '>
          {/* <img  src={more} alt={'remove'} width={23} className='ring-1 ring-[#80808080]' />
          <p className='ml-2 text-[#80808080]'>Add Task</p> */}
          <p className='text-[2rem] text-white -mt-2 font-bold font-sans'>+</p>
        </div>
      </section>
      {addTaskModal && <Create Add={handleAdd} edit={edits} changeBtn={change}/>}
    </div>
  )
}

export default Home
