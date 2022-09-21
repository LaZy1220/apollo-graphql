import styled from "styled-components"
import { CartItem } from "../components/CartItem"

const CartEl = styled.div`
padding: 80px 0;
`
const CartTitle = styled.h1`
    font-size:32px;
    font-weight:var(--fw-bold);
    text-transform: uppercase;
    padding-bottom: 55px;
    border-bottom: 1px solid #E5E5E5;
`
export const CartPage = ({
    order,
    currentCurrency,
    incrementQuantity,
    decrementQuantity,
    totalPrice,
    orderCounter,
})=>{
    return(
        <CartEl>
            <CartTitle>Cart</CartTitle>
            {
                order.map(item=>(
                    <CartItem 
                        key={item.id}
                        item={item}
                        currentCurrency={currentCurrency}
                        incrementQuantity={incrementQuantity}
                        decrementQuantity={decrementQuantity}/>
                ))
            }
            <p></p>
            <p></p>
            <p></p>
            <button></button>
        </CartEl>
    )
}