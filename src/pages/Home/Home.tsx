
import { useState, useEffect } from 'react'
import { addTask, deleteTask, editTask,  showTask, showTaskCategory } from '../apis/homeApi'
import Single from './Single-Task'
import Create from '../Add/Create'
import more from '../../assets/add.png'





interface props{
  add:boolean,
  setAdd:React.Dispatch<React.SetStateAction<boolean>>
  cart:string,
  setCategories:React.Dispatch<React.SetStateAction<string[]>>
}

interface todo{
  _id:number,
  todo:string,
  categoory:string,
  date:String,
  completed:boolean
}


const Home: React.FC<props>= ({add, setAdd, cart, setCategories}) => {

    const [Tasks, setTasks] = useState<todo[]>([])
    const [change, setchange] = useState<string>("add")
 const users = localStorage.getItem('user')
    const notDone=async():Promise<void>=>{
      
       if(cart!=="" && users){
         const data= JSON.parse(users)
         const taskCategory = await showTaskCategory(cart, data.token)
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

       if(cart!=="" && users){
         const data= JSON.parse(users)
         const taskCategory = await showTaskCategory(cart, data.token)
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
      if(cart!=="" && users){
        categoryy()
      }
      else{
        showTasks()
      }
    
    }
    const categoryy = async():Promise<void>=>{
       if(cart!=="" && users){
        
        const data= JSON.parse(users)
        const taskCategory = await showTaskCategory(cart, data.token)
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
            setCategories(Tasks.map(Task=>Task.categoory))
          }    

       
     }
   

   }
   useEffect(()=>{
      if(cart!==""){
        categoryy()
      }
      else{
       showTasks()
       setCategories(Tasks.map(Task=>Task.categoory));
      }
    },[cart])

   
  const handleAdd =async( task:todo):Promise<void>=>{
  
      if(users){
        const data= JSON.parse(users)
        const value = JSON.stringify({todo:task.todo, categoory:task.categoory, completed:task.completed})
 
        const create = await addTask(value, data.token)
          if(create){
            if(cart!=="" && users){
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
            if(cart!=="" && users){
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
            if(cart!=="" && users){
              categoryy()
            }else{showTasks()}
          }  
      
      }
    
  }
  const edit =(id:number):void=>{
    setAdd(true)
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
                if(cart!=="" && users){
                  categoryy()
                }else{showTasks()}
              }   
          }
     }
   
  }

 return (
    <div >
       
      <h1 className=' text-center text-[#3d3d5c] text-xl'> Your Tasks</h1>

      <div className='flex justify-between mb-8 mt-6'>
         <h1 className='ml-5 text-xl text-[#3d3d5c]'>Tasks</h1>
         <div className='flex mr-1 md:mr-8'>
          <p className='mr-2 bg-slate-200 rounded-md px-3 h-6 text-gray-500 ring-1 ring-slate-400 cursor-pointer' onClick={All}>All</p>
          <p className='mr-2 bg-slate-200 rounded-md px-2 h-6 text-gray-400 ring-1 ring-slate-300 cursor-pointer' onClick={completed}>Done</p>
          <p className='mr-2 bg-slate-200 rounded-md px-2 h-6 text-gray-400 ring-1 ring-slate-300 cursor-pointer' onClick={notDone}>Not Done</p>
         </div>
      </div>

      
       { Tasks.map((item)=>{return(<Single key={item._id} todo={item} ondelete={ handleDelete} done={done} edits={edit}/>)})}
      
  
      
      <section className='flex justify-center cursor-pointer mt-10 mb-10 animate' onClick={()=>{setAdd(true)
       setchange("add")}}>
        <div className='flex justify-center  bg-gray-200 rounded-lg w-[20rem] py-2 ring-1 ring-[#80808080] shadow-xl md:w-[30rem]'>
          <img  src={more} alt={'remove'} width={23} className='ring-1 ring-[#80808080]' />
          <p className='ml-2 text-[#80808080]'>Add Task</p>
        </div>
      </section>
      {add && <Create  setAdd={setAdd} Add={handleAdd} edit={edits} changeBtn={change}/>}
    </div>
  )
}

export default Home
