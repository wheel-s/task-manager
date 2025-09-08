

const url = 'https://task-backend-rosy.vercel.app/api/v1'

const Login = async(login:string, setMsg:any )=>{
    try{
    const response = await  fetch(`${url}/user/login`,{
                                    method:'POST',
                                    headers:{'Content-Type':'application/json'},
                                    body:login
                                    })
         if (!response.ok){
                setMsg( response.json())
                setTimeout(() => {setMsg('')},5000);

         }
        const data = await response.json()
        return data
    }
    catch(error){
     console.log(error)
     return null;
    }
}


const Register = async(register:string, setMsg:any )=>{
    try{
    const response = await  fetch(`${url}/user/register`,{
                                    method:'POST',
                                    headers:{'Content-Type':'application/json'},
                                    body:register
                                    })
         if (!response.ok){
                setMsg( response.json())
                setTimeout(() => {setMsg('')},5000);

         }
        const data = await response.json()
        return data
    }
    catch(error){
     console.log(error)
     return null;
    }
}


export{Login, Register}