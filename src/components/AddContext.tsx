// import React from 'react'
import { useContext, useState, createContext } from "react";


const HomeContext = createContext<any>(null)

export function HomeProvider({children}:{children:React.ReactNode}){
    const [addTaskModal,setaddTaskModal ] = useState<boolean>(false)
    
    return(
        <HomeContext.Provider value={{addTaskModal,setaddTaskModal}}>
            {children}
        </HomeContext.Provider>
    )

}


export function useData(){
    return useContext(HomeContext)
}
