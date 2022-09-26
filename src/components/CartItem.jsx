import styled from "styled-components"
import { ParametersInCart } from "./ParametersInCart"
import { useState } from "react"

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
const SwitchImgEl = styled.div`
    position: absolute;
    right: 16px;
    bottom: 16px;
    display: flex;
    gap:8px;
`
const SwitchImg = styled.div`
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0.73);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ImgWrapper = styled.div`
    position: relative;
`
export const CartItem = ({
    item,
    currentCurrency,
    incrementQuantity,
    decrementQuantity,
})=>{
    const [currentImg,setCurrentImg]=useState(0)
    const prevImg =()=>{
        if(currentImg>0){
            console.log(currentImg);
            setCurrentImg(prev=>prev-1)
        }
        if(currentImg===0){
            setCurrentImg(item.gallery.length-1)
            console.log(currentImg);
        }
    }
    const nextImg = ()=>{
        if(currentImg<item.gallery.length-1){
            setCurrentImg(prev=>prev+1)
        }
        if(currentImg===item.gallery.length-1){
            setCurrentImg(0)
        }
    }
    return(
        <CartItemEl>
            <LeftCartElements>
                <OrderTitle>{item.name}</OrderTitle>
                <OrderBrand>{item.brand}</OrderBrand>
                {
                    item.prices.map(price=>(
                         price.currency.symbol===currentCurrency.symbol
                         &&<p key={price.amount} style={{paddingTop:'4px',fontWeight:'var(--fw-bold)',fontSize:'24px',marginBottom:'20px'}}>{currentCurrency.symbol}{price.amount}</p>
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
                    <ButtonIncDec onClick={()=>incrementQuantity(item.quantity,item.id,item.chooseItemAttribute)}><img src='/images/icons/Plus.svg' alt="Plus"/></ButtonIncDec>
                    <span style={{fontSize:'24px',textAlign:'center',fontWeight:'var(--fw-hard)'}}>{item.quantity}</span>    
                    <ButtonIncDec onClick={()=>decrementQuantity(item.quantity,item.id,item.chooseItemAttribute)}><img src='/images/icons/Dash.svg' alt="Dash"/></ButtonIncDec>  
                </Quantity>
                <ImgWrapper>
                    <OrderImg src={item.gallery[currentImg]}/>
                    <SwitchImgEl>
                        <SwitchImg onClick={()=>prevImg()}>
                            <img style={{transform:'rotate(180deg)'}} src="/images/icons/ArrowRight.svg" alt="arrow left"/>
                        </SwitchImg>
                        <SwitchImg onClick={()=>nextImg()}>
                            <img src="/images/icons/ArrowRight.svg" alt="arrow left"/>
                        </SwitchImg>
                    </SwitchImgEl>
                </ImgWrapper>
            </RightCartElements>
        </CartItemEl>
    )
}