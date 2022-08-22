import {useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import { Header } from './components/Header';
import {Conteinter} from './components/Conteiner';
import { HomePage } from './pages/HomePage';
import {Cart} from './pages/Cart';
import {ProductPage} from './pages/ProductPage'

function App() {
  const [currentCategory,setCurrentCategory]=useState('all')
  const [currentCurrency,setCurrentCurrency]=useState({label:'USD',symbol:'$'})
  const [order,setOrder]=useState([])
  const [isHide,setIsHide] =useState(false)

  const addOrder = (item,chooseItemAttribute,itemAttribute,counterItemAttribute)=>{
    if(itemAttribute===counterItemAttribute){
      const itemIndex = order.findIndex(orderItem=>{return orderItem.id===item.id})
      if(itemIndex<0){
        const newItem ={
          quantity:1,
          chooseItemAttribute:[...chooseItemAttribute],
          ...item
        }
        setOrder([...order,newItem])
      }
      else{
        const newOrder =order.map((orderItem,index)=>{
          if(index===itemIndex){
            return{
              ...orderItem,
              quantity:orderItem.quantity+1
            }
          }
          else{
            return orderItem
          }
        })
        setOrder(newOrder)
      }
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
        />
        <Routes>
          <Route path='/' element={<HomePage currentCategory={currentCategory}  currentCurrency={currentCurrency}/>}/>
          <Route path='/product/:id' 
          element={<ProductPage 
            currentCurrency={currentCurrency}
            addOrder={addOrder}/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </Conteinter>
    </div>
  );
}

export default App;
