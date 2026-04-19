import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/auth/Form'
import Home from './pages/Home/Home'
import Header from './components/Header/Header';
import Settings from './pages/auth/Settings';
import Smart from './pages/plans/smart';
import Details from './pages/plans/Details';
import { HomeProvider } from './components/AddContext';
import { CategoryProvider } from './components/CategoryContext';
import { CategoriesProvider } from './components/CategoriesContex';

const App:React.FC = ()=> {


  const [nav, setNav] = useState<boolean>(true)  

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
  <CategoriesProvider>
  <CategoryProvider>
  <HomeProvider>
     <nav>
    
     </nav>

    {nav && <Header setNav={setNav} />}

    <Routes>

        <Route path='/home'element={<Home />} />
        <Route path='/' element={<Login SetNav={setNav}/>} />
        <Route path='/plans' element={<Smart setdetails={setdetails}/>}/>
        <Route path='/settings' element={<Settings/>} />
        <Route path='/details' element={<Details details={details}/>} />

     
    </Routes>
  </HomeProvider>
  </CategoryProvider>
  </CategoriesProvider>
    </div>
  );
}

export default App;
