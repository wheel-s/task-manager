

const url = 'http://localhost:5000/api/v1/todo'

const addTask = async(value:string, token:string)=>{
  try{
    const response = await  
           fetch(`${url}`,{
              method:'POST',
              headers:{ 
              'authorization':`Bearer ${token}`, 'Content-Type':'application/json'}, 
              body:value
            })
         if (!response.ok){
            console.log(response.json())

         }
        const data = await response.json()
        return data
    }
    catch(error){
     console.log(error)
     return null;
    }
}


const deleteTask = async(id:number,token:string )=>{
  try{
    const response = await  
        fetch(`${url}/${id}`,{
          method:'DELETE',
          headers:{ 'authorization':`Bearer ${token}`},  
        })

        const data = await response.json()
        return data
    }
    catch(error){
     console.log(error)
     return null;
    }
}



const editTask = async(id:number,token:string, value:string)=>{
  try{
    const response = await  
      fetch(`${url}/${id}`,{
           method:'PATCH',
           headers:{'authorization':`Bearer ${token}`,  'Content-Type':'application/json'},  
           body:value
          })

        const data = await response.json()
        return data
    }
    catch(error){
     console.log(error)
     return null;
    }
}

const showTask = async(token:string)=>{
  try{
    const response = await  
      fetch(`${url}`,{
           headers:{'authorization':`Bearer ${token}`},    
          })

        const data = await response.json()
        return data
    }
    catch(error){
     console.log(error)
     return null;
    }
}


const showTaskCategory = async(cart:string, token:string)=>{
  try{
    const response = await  
     
        fetch(`${url}/${cart}`,{
          headers:{'authorization':`Bearer ${token}`},
        })

        const data = await response.json()
        return data
    }
    catch(error){
     console.log(error)
     return null;
    }
}



export{addTask, deleteTask, editTask, showTask, showTaskCategory}



