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
  const [isHide,setIsHide] =useState(false)

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
          <Route path='/product/:name' element={<ProductPage/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </Conteinter>
    </div>
  );
}

export default App;
