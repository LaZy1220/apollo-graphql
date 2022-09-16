import styled from "styled-components";
import { ParametersInMiniCart } from "../components/ParametersInMiniCart"

const MiniCartItemEl = styled.div`
    margin-bottom: 40px;
`
const OrderName = styled.p`
    font-weight: var(--fw-light);
    font-size: 16px;
    line-height: 160%;

`
export const MiniCartItem = ({
    order,
    currentCurrency
})=>{
    return(
        <MiniCartItemEl>
            <>
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
            </>
            <>
                     
            </>
        </MiniCartItemEl>
    )
}