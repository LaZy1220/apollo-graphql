import styled from 'styled-components';
import { GoodsList } from '../components/GoodsList';

const CategoryTitle = styled.p`
 padding: 0;
 margin: 0;
  margin-top: 80px;
  margin-bottom: 60px;
  font-size: 42px;
  font-weight:var(-fw-normal);
` 

export const HomePage =({
    currentCategory,
    currentCurrency,
    addOrder,
})=>{
    const ucFirst = (str) => str[0].toUpperCase()+str.slice(1);
    return(
        <>
            <CategoryTitle>{ucFirst(currentCategory)}</CategoryTitle>
            <GoodsList 
                currentCategory={currentCategory}
                currentCurrency={currentCurrency}
                addOrder={addOrder}
            />
        </>
    )
}