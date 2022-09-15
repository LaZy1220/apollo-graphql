import styled from "styled-components"

const Wrapper = styled.div`
    margin-left:22px;
`
const Quantity = styled.span`
    position: absolute;
    right: 90px;
    top:15px;
    width: 20px;
    height: 20px;
    font-size: 11px;
    font-weight: var(--fw-bold);
    font-family: var(--roboto);
    background-color: var(--black);
    border-radius: 50%;
    color: white;
    line-height: 20px;
    display: flex;
    justify-content: center;
    text-align: center;
`

export const Cart = ({orderCounter})=>{
    return(
        <Wrapper>
            <img 
                style={{width:'20px',height:'18px',cursor:'pointer'}} 
                src="/images/Cart-black.svg" 
                alt="cart" 
                title="cart"/>
            {
                orderCounter===0
                ?''
                :<Quantity>{orderCounter}</Quantity>

            }
        </Wrapper>
    )
}