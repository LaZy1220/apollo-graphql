import { GET_CATEGORIES} from "../query/categories";
import { useQuery } from "@apollo/client/react";

export const CategoryItems=({
    currentCategory,
    handleSwitchCategory
})=>{
    const {data,loading}=useQuery(GET_CATEGORIES)
    if(loading){
        return <h2>Loading...</h2>
    }
    return(
        <>
        {
            data.categories.map(cat=>(
                <li 
                className={currentCategory===cat.name?'active':''} 
                onClick={()=>handleSwitchCategory(cat.name)}
                key={cat.name} 
                style={{padding:'0 16px 30px 16px',cursor:'pointer'}}>
                {(cat.name).toUpperCase()}
            </li>))
        }       
        </>
    )
}