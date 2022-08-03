import {useState } from 'react';
import { Header } from './components/Header';
import { GoodsList } from './components/GoodsList';
import {Conteinter} from './components/Conteiner'
import styled from 'styled-components';

const CategoryTitle = styled.p`
 padding: 0;
 margin: 0;
  margin-top: 80px;
  margin-bottom: 60px;
  font-size: 42px;
  font-weight:var(-fw-normal);
`
const ucFirt = (str) => str[0].toUpperCase()+str.slice(1); 

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
        <CategoryTitle>{ucFirt(currentCategory)}</CategoryTitle>
          <GoodsList 
            currentCategory={currentCategory}
            currentCurrency={currentCurrency}/>
      </Conteinter>
    </div>
  );
}

export default App;
