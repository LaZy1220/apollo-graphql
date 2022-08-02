import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "./query/products";

function App() {
  const [currentCategory,setCurrentCategory]=useState('all')
  const [currentCurrency,setCurrentCurrency]=useState('USD')
  const [isHide,setIsHide] =useState('true')
  const {data}=useQuery(GET_PRODUCTS,{
    variables:{
      title:currentCategory
    }
  })

  const [currentProducts,setCurrentProducts]=useState(data)

  const handleSwitchCategory = (name)=>{
    setCurrentCategory(name)  
    setCurrentProducts(data)
  }

  const showSelect =(event,id)=>{
    if(event.target.id==='select'){
      setIsHide(!isHide)
    }
    else{
      setIsHide(false)
    }
  }

  useEffect(()=>{
    setCurrentProducts(data)
  },[data])
    return (
    <div className="App" onClick={showSelect}>
      <Header 
      currentCategory={currentCategory} 
      handleSwitchCategory={handleSwitchCategory}
      setCurrentCurrency={setCurrentCurrency}
      currentCurrency={currentCurrency}
      isHide={isHide}
      />
    </div>
  );
}

export default App;
