import { useState,useEffect } from "react"
import { useQuery } from "@apollo/client"
import { GET_PRODUCTS } from "../query/products";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom'

const GoodsLostEl = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(336px,1fr));
  grid-gap:40px;
  padding-bottom: 190px;
`
const Card = styled.div`
  cursor: pointer;
  margin-top: 60px;
  &:hover{box-shadow:var(--shadow)};
`
const CardBody = styled.div`
  padding: 16px;
`
const ImgWrapper = styled.div`
  position: relative;
`
const GoodsTitle = styled.p`
  font-size:18px;
  font-weight:var(--fw-light);
  margin-top: 20px;
`
const GoodsImg = styled.img`
  width: 100%;
  height: 338px;
`
const GoodsPrice = styled.span`
  font-weight:var(--fw-hard);
`
const OutStockImg = styled.div`
  background-color: #E5E5E5;
  width: 100%;
  height: 338px;
`

export const GoodsList = ({
  currentCategory,
  currentCurrency
})=>{
  const [currentProducts,setCurrentProducts]=useState([])
  const navigate = useNavigate()
  const {data,loading,error}=useQuery(GET_PRODUCTS,{
    variables:{
      title:currentCategory
    }
  })
  useEffect(()=>{
    setCurrentProducts(data?.category?.products)
  },[data])
    return(
        <GoodsLostEl>
            {
              error&&<h3>Sorry, we have a problem, try again</h3>
            }
            {
                loading
                ?<h1>Loading...</h1>
                :currentProducts?.map(item=>(
                    <Card key={item.id} onClick={()=>navigate(`/product/${item.id}`)}>
                      <CardBody>
                        {
                          item.inStock
                          ?<GoodsImg src={item.gallery[0]}/>
                          :<ImgWrapper>
                            <GoodsImg style={{position:'absolute',top:'0',opacity:'0.5' }} src={item.gallery[0]}/>
                            <OutStockImg style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                              <div>OUT OF STOCK</div>
                            </OutStockImg>
                          </ImgWrapper>
                        }
                        <GoodsTitle>{item.name}</GoodsTitle>
                        {
                          item.prices.map(price=>(
                            price.currency.symbol===currentCurrency.symbol&&<GoodsPrice key={price.amount}>{currentCurrency.symbol}{price.amount}</GoodsPrice>
                          ))
                        }
                      </CardBody>
                    </Card>
                ))
            }
        </GoodsLostEl>    
    )
}