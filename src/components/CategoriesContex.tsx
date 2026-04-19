import { useState, useContext, createContext } from "react";



type context = {
    categories:string[],
    setCategories:React.Dispatch<React.SetStateAction<string[]>>
}

const CategoriesContex = createContext<context>({
    categories:[],
    setCategories:()=>{}
})


export function CategoriesProvider({children}:{children:React.ReactNode}){
    const [categories, setCategories] = useState<string[]>([])
    
    return(
        <CategoriesContex.Provider value={{categories, setCategories}}>
            {children}
        </CategoriesContex.Provider>
    )
}


export function useCategories(){
    return useContext(CategoriesContex)
}
