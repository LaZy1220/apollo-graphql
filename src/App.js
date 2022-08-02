import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "./query/products";
import { GoodsList } from './components/GoodsList';
import {Conteinter} from './components/Conteiner'

function App() {
  const [currentCategory,setCurrentCategory]=useState('all')
  const [currentCurrency,setCurrentCurrency]=useState({label:'USD',symbol:'$'})
  const [isHide,setIsHide] =useState(false)
  const [currentProducts,setCurrentProducts]=useState([])
  const {data,loading}=useQuery(GET_PRODUCTS,{
    variables:{
      title:currentCategory
    }
  })

  const handleSwitchCategory = (name)=>{
    setCurrentCategory(name)  
  }

  const showSelect =(event)=>{
    if(event.target.title==='select'){
      setIsHide(!isHide)
    }
    else{
      setIsHide(false)
    }
  }
  useEffect(()=>{
    setCurrentProducts(data?.category?.products)
  },[data])
    return (
    <div className="App" onClick={showSelect}>
      <Conteinter>
        <Header 
          currentCategory={currentCategory} 
          handleSwitchCategory={handleSwitchCategory}
          setCurrentCurrency={setCurrentCurrency}
          currentCurrency={currentCurrency}
          isHide={isHide}
        />
        {
          loading
          ?<h1>Loading...</h1>
          :<GoodsList currentProducts={currentProducts}/>
        }
      </Conteinter>
    </div>
  );
}

export default App;
