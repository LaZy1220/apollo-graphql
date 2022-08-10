import styled from "styled-components"

const Wrapper = styled.div`
    cursor: pointer;
    margin-left:22px;
`
const Quantity = styled.span`
    position: absolute;
    right: 90px;
    top:15px;
    width: 20px;
    height: 20px;
    background-color: var(--black);
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    text-align: center;
`

export const Cart = ({quantity=1})=>{
    return(
        <Wrapper>
            <img style={{width:'20px',height:'18px'}} src="/images/Cart.svg"/>
            {
                quantity===0
                ?''
                :<Quantity>{quantity}</Quantity>

            }
        </Wrapper>
    )
}