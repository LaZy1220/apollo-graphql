import {useState } from 'react';
import { Header } from './components/Header';
import { GoodsList } from './components/GoodsList';
import {Conteinter} from './components/Conteiner'
import styled from 'styled-components';

const CategoryTitle = styled.p`
  margin: 80px 0 100px;
  font-size: 42px;
  font-weight:var(-fw-normal);
`

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
        <CategoryTitle>{currentCategory}</CategoryTitle>
          <GoodsList currentCategory={currentCategory}/>
      </Conteinter>
    </div>
  );
}

export default App;
