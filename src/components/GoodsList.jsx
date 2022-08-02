export const GoodsList = ({currentProducts})=>{
    return(
        <ul>
           {
            currentProducts?.map((item)=>(
                <li key={item.id}>{currentProducts.name}</li>
            ))
           }
        </ul>
    )
}