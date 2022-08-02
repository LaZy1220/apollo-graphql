import styled from "styled-components";
import { Conteinter } from "./Conteiner";
import { CategoryItems } from "./CategoryItems";
import { CustomSelect } from "./CustomSelect";

const HeaderEl = styled.div`
    padding-top:28px;
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
    margin-left:22px;
`
const CategoriesList = styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
`
const Select = styled.div`
    display:flex;
`

export const Header = ({
    currentCategory,
    handleSwitchCategory,
    setCurrentCurrency,
    currentCurrency,
    isHide,
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
                    <Logo src="/images/Logo.svg"/>
                    <Select>
                        <CustomSelect
                            setCurrentCurrency={setCurrentCurrency}
                            currentCurrency={currentCurrency}
                            isHide={isHide}
                        />
                        <Cart src="/images/Cart.svg"/>
                    </Select>
                </Wrapper>
            </Conteinter>
        </HeaderEl>
    )
}