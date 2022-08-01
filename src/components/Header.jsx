import styled from "styled-components";
import { Conteinter } from "./Conteiner";
import { CategoryItems } from "./CategoryItems";
import { Form } from "./Form";

const HeaderEl = styled.div`
    margin-top:28px;
`
const Wrapper = styled.div`
    display:flex;
    justify-content:space-between
`
const Logo = styled.img`
    width:32px;
    height:29px;
    position: absolute;
    left: 50%;
    cursor: pointer;
`
const Cart = styled.img`
    width:20px;
    height:18px;
    cursor: pointer;
`
const CategoriesList = styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
`
const Select = styled.div`
    display:flex;
    gap:1;
`

export const Header = ({
    currentCategory,
    handleSwitchCategory,
    handleChange,
    currentCurrency,
    })=>{
    return(
        <HeaderEl>
            <Conteinter>
                <Wrapper>
                    <CategoriesList>
                        <CategoryItems
                            currentCategory={currentCategory}
                            handleSwitchCategory={handleSwitchCategory}
                        />
                    </CategoriesList>
                    <Logo src="images/Logo.svg"/>
                    <Select>
                        <Form
                            handleChange={handleChange}
                            currentCurrency={currentCurrency}
                        />
                        <Cart src="/images/Cart.svg"/>
                    </Select>
                </Wrapper>
            </Conteinter>
        </HeaderEl>
    )
}