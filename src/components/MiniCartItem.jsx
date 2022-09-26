import styled from "styled-components";
import { ParametersInMiniCart } from "../components/ParametersInMiniCart"

const MiniCartItemEl = styled.div`
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
`
const LeftCartElements = styled.div`
    width: 136px;
`
const RightCartElements = styled.div`
    display: flex;
    gap:8px;
`
const ButtonIncDec = styled.button`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    cursor: pointer;
`
const OrderName = styled.p`
    font-weight: var(--fw-light);
    font-size: 16px;
    line-height: 160%;
`
const Quantity = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`
const OrderImg = styled.img`
width:121px;
max-height: 196px;
`
export const MiniCartItem = ({
    order,
    currentCurrency,
    incrementQuantity,
    decrementQuantity,
})=>{
    return(
        <MiniCartItemEl>
            <LeftCartElements>
                <OrderName>{order.name}</OrderName>
                <OrderName>{order.brand}</OrderName>
                        {
                            order.prices.map(price=>(
                                price.currency.symbol===currentCurrency.symbol
                                &&<p key={price.amount} style={{paddingTop:'4px',fontWeight:'var(--fw-hard)',fontSize:'16px'}}>{currentCurrency.symbol}{price.amount}</p>
                            ))
                        }
                        {
                            order.attributes.map(atr=>(
                                <ParametersInMiniCart
                                key={atr.id}
                                atr={atr}
                                chooseItemAttribute={order.chooseItemAttribute}
                                />
                            ))
                        }
            </LeftCartElements>
            <RightCartElements>
                <Quantity>
                    <ButtonIncDec onClick={()=>incrementQuantity(order.id,order.chooseItemAttribute)}><img src='/images/icons/Plus.svg' alt="Plus"/></ButtonIncDec>
                    <span style={{fontSize:'16px',textAlign:'center'}}>{order.quantity}</span>    
                    <ButtonIncDec onClick={()=>decrementQuantity(order.quantity,order.id,order.chooseItemAttribute)}><img src='/images/icons/Dash.svg' alt="Dash"/></ButtonIncDec>  
                </Quantity>
                <OrderImg src={order.gallery[0]}/>
            </RightCartElements>
        </MiniCartItemEl>
    )
}