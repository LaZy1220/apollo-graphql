import styled from "styled-components";
import { useQuery } from "@apollo/client/react";
import { GET_CURRENCIES } from "../query/currencies"
const CustomSelectEl = styled.div`
    cursor: pointer;
    height: 20px;
` 
const IconSelect = styled.img`
    margin-left:10px;       
`
const Options = styled.ul`
    margin: 0;
    padding:0;
    position:absolute;
    list-style:none;
    box-sizing: border-box;
    top:65px;
    right:108px;
    box-shadow: 0px 0px 38px -2px rgba(34, 60, 80, 0.06);
`
const Currency = styled.li`
    padding:20px 40px;
    position: relative;
    &:hover{background-color:#EEEEEE}
`
const CurrencySymbol = styled.span`
    position: absolute;
    left:20px;
`

export const CustomSelect=({ 
    setCurrentCurrency,
    currentCurrency,
    isHide})=>{
        const {data,loading}=useQuery(GET_CURRENCIES)
        if (loading) {
            return ''
        }
    return(
        <>
                <CustomSelectEl title="select">
                    {currentCurrency.symbol}
                    <IconSelect title="select" src='images/icons/Arrow.svg' style={{transform:'rotate(180deg)'}}/>
                </CustomSelectEl>
                {isHide?
                <Options>
                    {data.currencies.map(cur=>(
                        <Currency onClick={()=>setCurrentCurrency({label:cur.label,symbol:cur.symbol})} key={cur.label}><CurrencySymbol>{cur.symbol}</CurrencySymbol>{cur.label}</Currency>
                    ))}
                </Options>
                :''}
        </>
    )
}