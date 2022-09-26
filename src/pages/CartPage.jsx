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
const Text = styled.p`
    font-size: 24px;
`
const Numbers = styled.p`
    font-size: 24px;
    font-weight: var(--fw-bold);
`
const FlexEl = styled.div`
    display: flex;
    gap:5px;
    padding: 32px 0 16px 0;
`
const ButtonOrder = styled.button`
    width: 279px;
    height: 43px;
    background-color: #5ECE7B;
    color: white;
    border: none;
    text-transform: uppercase;
    font-weight:var(--fw-hard2);
    cursor: pointer;
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
            <FlexEl>
                <div>
                    <Text>Tax 21%: </Text>
                    <Text>Quannity: </Text>
                    <Text>Total: </Text>
                </div>
                <div>
                    <Numbers>{currentCurrency.symbol}{Math.round(totalPrice*21)/100}</Numbers>
                    <Numbers>{orderCounter}</Numbers>
                    <Numbers>{currentCurrency.symbol}{totalPrice}</Numbers>
                </div>
            </FlexEl>           
            <ButtonOrder>Order</ButtonOrder>
        </CartEl>
    )
}