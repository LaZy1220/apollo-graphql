import {useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import { Header } from './components/Header';
import {Conteinter} from './components/Conteiner';
import { HomePage } from './pages/HomePage';
import {CartPage} from './pages/CartPage';
import {ProductPage} from './pages/ProductPage'

function App() {
  const [currentCategory,setCurrentCategory]=useState('all')
  const [currentCurrency,setCurrentCurrency]=useState({label:'USD',symbol:'$'})
  const [orderCounter,setOrderCounter]=useState(0)
  const [order,setOrder]=useState([])
  const [isHide,setIsHide] =useState(false)
  const incrementOrderCounter = ()=>{
    setOrderCounter(orderCounter+1)
  }
  const addOrder = (item,chooseItemAttribute,itemAttribute,counterItemAttribute)=>{
    if(itemAttribute===counterItemAttribute){
        const newItem ={
          quantity:1,
          chooseItemAttribute:[...chooseItemAttribute],
          ...item
        }
        incrementOrderCounter()
        setOrder([...order,newItem])
    }
    else{
      alert('Select product attributes')
    }
  }
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
    return (
    <div className="App" onClick={showSelect}>
      <Conteinter>
        <Header 
          currentCategory={currentCategory} 
          handleSwitchCategory={handleSwitchCategory}
          setCurrentCurrency={setCurrentCurrency}
          currentCurrency={currentCurrency}
          isHide={isHide}
          orderCounter={orderCounter}
        />
        <Routes>
          <Route path='/' element={<HomePage currentCategory={currentCategory}  currentCurrency={currentCurrency}/>}/>
          <Route path='/product/:id' 
          element={<ProductPage 
            currentCurrency={currentCurrency}
            addOrder={addOrder}/>}/>
          <Route path='/cart' element={<CartPage/>}/>
        </Routes>
      </Conteinter>
    </div>
  );
}

export default App;
