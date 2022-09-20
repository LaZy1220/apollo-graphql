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
const ButtonViewBag = styled.button`
    width: 140px;
    height: 43px;
    background-color: white;
    text-transform: uppercase;
    font-weight: var(--fw-hard2);
    border: 1px solid #1D1F22;
    cursor: pointer;
`
const ButtonCheckOut = styled.button`
    width: 140px;
    height: 43px;
    background-color: #5ECE7B;
    text-transform: uppercase;
    font-weight: var(--fw-hard2);
    border: none;
    color: white;
    cursor: pointer;
`
const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    margin:32px 0;
`
const TotalPrice = styled.div`
    display: flex;
    justify-content: space-between;
`
export const MiniCart =({
    orderCounter,
    order,
    currentCurrency,
    setIsHideMiniCart,
})=>{    
    const navigate = useNavigate()
    const openCartPage = ()=>{
        setIsHideMiniCart(false)
        navigate('/cart/')
    }
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
            <TotalPrice>
                <span style={{fontSize:'16px',fontFamily:'var(--roboto)',fontWeight:'var(--fw-hard)'}}>Total</span>
                <span style={{fontSize:'16px',fontWeight:'var(--fw-bold)'}}>200$</span>
            </TotalPrice>
            <Buttons>
                <ButtonViewBag onClick={()=>openCartPage()}>View bag</ButtonViewBag>
                <ButtonCheckOut>Check out</ButtonCheckOut>
            </Buttons>
        </MiniCartEl>
    )
}