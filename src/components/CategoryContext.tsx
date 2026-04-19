import { useState, useContext, createContext } from "react";




const CategoryContex = createContext<any>(null)


export function CategoryProvider({children}:{children:React.ReactNode}){
    const [category, setCategory] = useState<string>("")
    
    return(
        <CategoryContex.Provider value={{category, setCategory}}>
            {children}
        </CategoryContex.Provider>
    )
}


export function useCategory(){
    return useContext(CategoryContex)
}


