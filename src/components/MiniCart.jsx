import styled from "styled-components"

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
    padding-bottom: 32px;
`
export const MiniCart =({orderCounter})=>{
    return(
        <MiniCartEl>
            <Title>My Bag, {`${orderCounter}`} items</Title>
        </MiniCartEl>
    )
}