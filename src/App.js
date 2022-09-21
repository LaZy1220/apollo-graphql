import {useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import { Header } from './components/Header';
import {Conteinter} from './components/Conteiner';
import { HomePage } from './pages/HomePage';
import {CartPage} from './pages/CartPage';
import {ProductPage} from './pages/ProductPage'
import { MiniCart } from './components/MiniCart';
import { BackGround } from './components/BackGround';

function App() {
  const [currentCategory,setCurrentCategory]=useState('all')
  const [currentCurrency,setCurrentCurrency]=useState({label:'USD',symbol:'$'})
  const [orderCounter,setOrderCounter]=useState(0)
  const [order,setOrder]=useState([])
  const [isHide,setIsHide] =useState(false)
  const [isHideMiniCart,setIsHideMiniCart]=useState(false)
  const incrementOrderCounter = ()=>{
    setOrderCounter(orderCounter+1)
  }
  const decrementOrderCounter = ()=>{
    if(orderCounter>0){
      setOrderCounter(orderCounter-1)
    }
    else{
      setOrderCounter(0)
    }
  }
  const addOrder = (item,chooseItemAttribute=[{label:'someAttribute',value:'none'}],itemAttribute=0,counterItemAttribute=0)=>{
    if(item.inStock===false){return alert('Sorry, product out of stock')}
    if(itemAttribute===counterItemAttribute){
        const itemIndex = order.findIndex(orderItem=>{return item.id===orderItem.id && JSON.stringify(orderItem.chooseItemAttribute)===JSON.stringify(chooseItemAttribute)})
        if(itemIndex<0){
          const newItem ={
            quantity:1,
            chooseItemAttribute:[...chooseItemAttribute],
            ...item
          }
          setOrder([...order,newItem])
        }
        else{
          const newOrder = order.map((orderItem,index)=>{
              if(itemIndex === index && JSON.stringify(orderItem.chooseItemAttribute)===JSON.stringify(chooseItemAttribute)){
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
        incrementOrderCounter()
    }
    else{
      alert('Select product attributes')
    }
  }
  const totalPrice=order.reduce((sum,item)=>{
    let itemPrice = 0
    item.prices.map(price=>{
        if(price.currency.symbol===currentCurrency.symbol){
            itemPrice=price.amount
        }
        return 0
    })
    return sum+item.quantity*itemPrice
},0)
  const incrementQuantity = (itemId,orderAttributes)=>{
    const newOrder = order.map(element=>{
        if(itemId===element.id&&JSON.stringify(orderAttributes)===JSON.stringify(element.chooseItemAttribute)){
             const newQuantity=element.quantity+1
             return{
                ...element,
                quantity:newQuantity,
             }
        }
        else{
            return element
        }
    })
    setOrder(newOrder)
    incrementOrderCounter()
}
const decrementQuantity = (itemId,orderAttributes)=>{
  const newOrder = order.map(element=>{
      if(itemId===element.id&&JSON.stringify(orderAttributes)===JSON.stringify(element.chooseItemAttribute)){
           const newQuantity=element.quantity-1
           return{
              ...element,
              quantity:newQuantity>=0?newQuantity:0
           }
      }
      else{
          return element
      }
  })
  setOrder(newOrder)
  decrementOrderCounter()
}
  const handleSwitchCategory = (name)=>{
    setCurrentCategory(name)  
  }
  const closeModal = ()=>{
    setIsHideMiniCart(false)
  }
  const showModal =(event)=>{
    event.stopPropagation()
    if(event.target.title==='cart'){
      setIsHideMiniCart(!isHideMiniCart)
    }
    if(event.target.title==='select'){
      setIsHide(!isHide)
    }
    else{
      setIsHide(false)
    }
  }
    return (
    <div className="App" 
      onClick={showModal}>
        <Header 
          currentCategory={currentCategory} 
          handleSwitchCategory={handleSwitchCategory}
          setCurrentCurrency={setCurrentCurrency}
          currentCurrency={currentCurrency}
          isHide={isHide}
          orderCounter={orderCounter}
          closeModal={closeModal}
          />
        <Conteinter>
        {isHideMiniCart && 
                <><BackGround 
                    onClick={()=>closeModal()}/> 
                <MiniCart 
                    orderCounter={orderCounter}
                    order={order}
                    currentCurrency={currentCurrency}
                    setIsHideMiniCart={setIsHideMiniCart}
                    incrementQuantity={incrementQuantity}
                    decrementQuantity={decrementQuantity}
                    totalPrice={totalPrice}/>
                </>
        }
        <Routes>
          <Route 
            path='/' 
            element={<HomePage 
              currentCategory={currentCategory}  
              currentCurrency={currentCurrency}
              addOrder={addOrder}/>}/>
          <Route 
            path='/product/:id' 
            element={<ProductPage 
              currentCurrency={currentCurrency}
              addOrder={addOrder}/>}/>
          <Route 
            path='/cart' 
            element={<CartPage
              order={order}
              currentCurrency={currentCurrency}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              totalPrice={totalPrice}
              orderCounter={orderCounter}/>}/>
        </Routes>
      </Conteinter>
    </div>
  );
}

export default App;
