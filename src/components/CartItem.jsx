import styled from "styled-components"
import { ParametersInCart } from "./ParametersInCart"

const CartItemEl = styled.div`
    padding:24px 0 32px 0;
    border-bottom: 1px solid #E5E5E5;
    display: flex;
    justify-content: space-between;
    min-height: 288px;
`
const OrderTitle = styled.p`
    font-weight:var(--fw-hard2);
    font-size: 30px;
    padding-bottom: 16px;
`
const OrderBrand = styled.p`
    font-size: 30px;
    padding-bottom: 20px;
`
const LeftCartElements = styled.div`
    
`
const ButtonIncDec = styled.button`
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    cursor: pointer;
`
const OrderImg = styled.img`
    width: 200px;
    height: 288px;
`
const RightCartElements = styled.div`
    display: flex;
    gap:24px;
`
const Quantity = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`

export const CartItem = ({
    item,
    currentCurrency,
    incrementQuantity,
    decrementQuantity,
})=>{
    return(
        <CartItemEl>
            <LeftCartElements>
                <OrderTitle>{item.name}</OrderTitle>
                <OrderBrand>{item.brand}</OrderBrand>
                {
                    item.prices.map(price=>(
                         price.currency.symbol===currentCurrency.symbol
                         &&<p key={price.amount} style={{paddingTop:'4px',fontWeight:'var(--fw-bold)',fontSize:'24px',marginBottom:'20px'}}>{currentCurrency.symbol}{Math.round(price.amount*item.quantity*100)/100}</p>
                            ))
                }
                {
                    item.attributes.map(atr=>(
                        <ParametersInCart
                        key={atr.id}
                        atr={atr}
                        chooseItemAttribute={item.chooseItemAttribute}/>
                    ))
                }
            </LeftCartElements>
            <RightCartElements>
            <Quantity>
                    <ButtonIncDec onClick={()=>incrementQuantity(item.id,item.chooseItemAttribute)}><img src='/images/icons/Plus.svg' alt="Plus"/></ButtonIncDec>
                    <span style={{fontSize:'24px',textAlign:'center',fontWeight:'var(--fw-hard)'}}>{item.quantity}</span>    
                    <ButtonIncDec onClick={()=>decrementQuantity(item.id,item.chooseItemAttribute)}><img src='/images/icons/Dash.svg' alt="Dash"/></ButtonIncDec>  
                </Quantity>
                <OrderImg src={item.gallery[0]}/>
            </RightCartElements>

        </CartItemEl>
    )
}