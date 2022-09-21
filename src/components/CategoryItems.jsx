import { GET_CATEGORIES} from "../query/categories";
import { useQuery } from "@apollo/client/react";
import styled from "styled-components";

const Category = styled.li`
    padding:0 16px 30px 16px;
    cursor:pointer;
`

export const CategoryItems=({
    currentCategory,
    handleSwitchCategory
})=>{
    const {data,loading}=useQuery(GET_CATEGORIES)
    if(loading){
        return console.log('loading...');
    }
    return(
        <>
        {
            data.categories.map(cat=>(
                <Category 
                className={currentCategory===cat.name?'active':''} 
                onClick={()=>handleSwitchCategory(cat.name)}
                key={cat.name}>
                {(cat.name).toUpperCase()}
            </Category>))
        }       
        </>
    )
}