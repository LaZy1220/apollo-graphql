import styled from "styled-components"
import {useNavigate} from "react-router-dom"
import { MiniCartItem } from "./MiniCartItem"

const MiniCartEl = styled.div`
    position: absolute;
    right: 72px;
    width: 325px;
    background-color:white;
    z-index: 100;
    padding: 32px 16px 0 16px;
`
const Title = styled.h1`
    font-size:16px;
    margin-bottom: 32px;
`

export const MiniCart =({
    orderCounter,
    order,
    currentCurrency
})=>{    
    const navigate = useNavigate()
    return(
        <MiniCartEl id="cart">
            <Title>My Bag, <span style={{fontWeight:'var(--fw-hard)',}}>{`${orderCounter}`} items</span></Title>
            {
                order.map(item=>(
                   <MiniCartItem
                        key={item.name}
                        order={item}
                        currentCurrency={currentCurrency}
                   />
                ))
            }
        </MiniCartEl>
    )
}