
import { useState } from 'react'
import './add.scss'


interface todo{
  _id:number
  todo:string,
  categoory:string,
  date:String,
  completed:boolean
}



interface props{
  changeBtn:string,
  Add(task:todo):void
  setAdd:React.Dispatch<React.SetStateAction<boolean>>
  edit(task:todo):void,

}
const Create:React.FC<props> = ({ Add, setAdd, edit, changeBtn}) => {

  const [todo, settodo] = useState<string>("")
   const [categoory, setcategoory] = useState<string>("none")


   const onSubmit =(e:React.FormEvent)=>{
    e.preventDefault()
    if(changeBtn==='add'){
      Add({todo, categoory, completed:false, date:'', _id:1})
    }
    else{
      edit({todo, categoory, completed:false, date:'', _id:1})
    }
   
    settodo('')
    setcategoory('')
    setAdd(false)
   }
  return (
    <div className='up'>
    
    <div className='flex justify-center'>
      <div className='bg-gray-300 rounded-lg shadow-xl ring-1 ring-gray-400 py-3 px-2'>
        <h3 className='text-2xl mb-5  ml-3 py-2 text-[#3d3d5c]'>Add Task</h3>
        <p> </p>
        <form className='mt-4 '>
      
            <label className='sub'>
            <input placeholder='Task' type='text' className='mb-2 ml-[18px] text-black sm: w-[15rem]' value={todo} onChange={(e)=>{settodo(e.target.value)}}/>
          </label>
            <label className='text'>
            <textarea placeholder='Category'className='ml-[18px] text-gray-900 'value={categoory} onChange={(e)=>{setcategoory(e.target.value)}} />
          </label>
            
          <button className='btn' onClick={onSubmit}>{changeBtn==='add'?'ADD':'EDIT'}</button>
          <button className='btn' onClick={()=>setAdd(false)} >CANCEL</button>
        </form>
      </div>
   
      </div>
    </div>
  )
}

export default Create
