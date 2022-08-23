import styled from "styled-components";
import {useNavigate} from "react-router-dom"
import { CategoryItems } from "./CategoryItems";
import { CustomSelect } from "./CustomSelect";
import { Cart } from "./Cart";
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
    orderCounter,
    })=>{
        const navigate = useNavigate()
    return(
        <HeaderEl>
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
                        <Cart 
                            onClick={()=>navigate('/cart')}
                            orderCounter={orderCounter}/>
                    </Select>
                </Wrapper>
        </HeaderEl>
    )
}