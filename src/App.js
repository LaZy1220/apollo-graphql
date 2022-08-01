import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "./query/products";

function App() {
  const [currentCategory,setCurrentCategory]=useState('all')
  const [currentCurrency,setCurrentCurrency]=useState('USD')
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
  const handleChange = (e)=>{
    setCurrentCurrency(e.target.value)
  }
  useEffect(()=>{
    setCurrentProducts(data)
  },[data])
    return (
    <div className="App">
      <Header 
      currentCategory={currentCategory} 
      handleSwitchCategory={handleSwitchCategory}
      handleChange={handleChange}
      currentCurrency={currentCurrency}
      />
    </div>
  );
}

export default App;
