import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/auth/Form'
import Home from './pages/Home/Home'
import Sidebar from './components/sideBar/Sides'
import Header from './components/Header/Header';
import Settings from './pages/auth/Settings';
import Smart from './pages/plans/smart';
import Details from './pages/plans/Details';

const App:React.FC = ()=> {

  const [add, setAdd] = useState<boolean>(false)  
  const [nav, setNav] = useState<boolean>(true)  
  const [sidebar, setsideBar]= useState(false)
  const [category, setcategory]= useState<string>("")
  const[ categories, setCategories]= useState<string[] >([])
  const[details, setdetails] = useState<string[][]>([])
  useEffect(()=>{
    if(window.location.pathname==='/'){
      setNav(false)
    }
    else{
      setNav(true)
    }
  },[])
 
 
  return (
    <div>
     <nav>
    
     </nav>

    {nav && <Header set={setsideBar} />}
    {sidebar && <Sidebar set={setsideBar} setNav={setNav} cart={setcategory} categories={categories}/>}
    
    <Routes>
      <Route path='/home'element={<Home add={add} setAdd={setAdd} cart={category} setCategories={setCategories}/>} />
      <Route path='/' element={<Login SetNav={setNav}/>} />
      <Route path='/plans' element={<Smart setdetails={setdetails}/>}/>
      <Route path='/settings' element={<Settings/>} />
      <Route path='/details' element={<Details details={details}/>} />
  
     
    </Routes>

    </div>
  );
}

export default App;
