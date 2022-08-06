import { useEffect} from "react"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { GET_INFO_PRODUCTS } from "../query/infoProduct"
import styled from "styled-components"

const Details =styled.div``
const Info = styled.div``
const ProductImgs = styled.div``
const MainImg = styled.div``
const AltImgs = styled.div``
const ProductTitle = styled.div`
    font-size: 30px;
    font-family: var(--raleway);
    font-weight: var(--fw-hard2);
`
const ProductBrend = styled.div`
    font-size: 30px;
    margin-top: 43px;
`
const Parameters = styled.div``
const BoxItems = styled.div`
    display:flex;
    gap:12px;
`
const AddCartButton = styled.div`
    margin:20px 0 40px;
    width: 292px;
    height: 52px;
    background-color: #5ECE7B;
    color:white;
    font-size: 16px;
    display: flex;
    align-items:center;
    justify-content: center;
    font-weight: var(--fw-hard);
    cursor: pointer;
`
const Price = styled.div``
const Box = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height: 45px;
    width: 63px;
    border:1px solid var(--black);
    cursor: pointer;
`

export const ProductPage = ({
    infoProduct,
    setInfoProduct,
    currentCurrency,
})=>{
    const {id}  = useParams()
    const {data,loading,error}=useQuery(GET_INFO_PRODUCTS,{
        variables:{
          id:id
        }
      })
    useEffect(()=>{
        setInfoProduct(data?.product)
    },[data])
    return(
        <>  
            {error&&<h3>Sorry, we have a problem, try again</h3>}
            {
                loading
                ?<h1>Loading...</h1>
                :<Details>
                    <ProductImgs>
                        <MainImg/>
                        <AltImgs/>
                    </ProductImgs>
                    <Info>
                        <ProductTitle>{infoProduct?.name}</ProductTitle>
                        <ProductBrend>{infoProduct?.brand}</ProductBrend>
                        {infoProduct?.attributes.map(atr=>
                            (<Parameters key={atr.id}>
                                <span style={{ padding:'24px 0 8px',fontSize:'18px',fontWeight:'var(--fw-bold)',display:'block'}}>{(atr?.name).toUpperCase()}:</span>
                                <BoxItems>
                                {
                                    atr.items.map(item=>(
                                        atr.id==='Color'
                                        ?<Box style={{backgroundColor:`${item.value}`,height:'32px',width:'32px'}} key={item.id}/>
                                        :(<Box 
                                        key={item.id}>
                                            <span style={{letterSpacing:'0.05em',fontFamily:'var(--sspro)'}}>
                                                    <span>{item.value}</span>
                                            </span>
                                    </Box>) 
                                    ))
                                }
                                </BoxItems>
                             </Parameters>))}
                             <p style={{fontSize:'18px',fontWeight:'var(--fw-bold)',margin:'38px 0 10px'}}>PRICE:</p>
                            {
                        infoProduct?.prices.map(price=>(
                            price.currency.symbol===currentCurrency.symbol
                            &&<Price key={price.amount}><p style={{fontFamily:'var(--family)',fontWeight:'var(--fw-bold)',fontSize:'24px'}}>{currentCurrency.symbol}{price.amount}</p></Price>
                          ))
                        }
                        <AddCartButton>ADD TO CART</AddCartButton>
                        <div dangerouslySetInnerHTML={{__html:infoProduct?.description}}></div>
                    </Info>
                </Details>
            }
        </>
    )
}