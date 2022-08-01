import { useQuery } from "@apollo/client/react";
import { GET_CURRENCIES } from "../query/currencies"

const formatter = (label)=>{
    const value = '0'
    let curSym = new Intl.NumberFormat("ru",{style:"currency",currency:`${label}`}).format(value)
    return curSym.substr(curSym.length-1)
}
export const Form=({ 
    handleChange,
    currentCurrency})=>{
        const {data,loading}=useQuery(GET_CURRENCIES)
        if (loading) {
            return ''
        }
        console.log(formatter(currentCurrency));
    return(
        <form>
            <label>
                <select value={currentCurrency} onChange={handleChange}>
                    {
                        data.currencies.map(cur=>(
                            <option value={cur.label} key={cur.label}>{cur.label} {formatter(cur.label)}</option>
                        ))
                    }
                </select>
            </label>
        </form>
    )
}