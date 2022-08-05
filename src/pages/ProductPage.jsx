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
const ProductTitle = styled.div``
const ProductBrend = styled.div``
const Parameters = styled.div``
const BoxItems = styled.div`
    display:flex;
    gap:12px;
`
const AddCartButton = styled.button``
const Price = styled.div``
const Box = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height: 45px;
    width: 63px;
    border:1px solid #1D1F22;
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
                                <span>{atr?.name}:</span>
                                <BoxItems>
                                {
                                    atr.items.map(item=>(
                                        <Box
                                            key={item.id}>
                                                <span style={{letterSpacing:'0.05em',fontFamily:'var(--sspro)'}}>{item.displayValue}</span>
                                        </Box> 
                                    ))
                                }
                                </BoxItems>
                            </Parameters>))}
                            {
                        infoProduct?.prices.map(price=>(
                            price.currency.symbol===currentCurrency.symbol
                            &&<Price key={price.amount}><span style={{fontFamily:'var(--raleway)',fontWeight:'var(--fw-hard)'}}>{currentCurrency.symbol}{price.amount}</span></Price>
                          ))
                        }
                        <AddCartButton>ADD TO CART</AddCartButton>
                        <p>{infoProduct?.description}</p>
                    </Info>
                </Details>
            }
        </>
    )
}