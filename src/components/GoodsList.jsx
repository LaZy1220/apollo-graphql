import { useState,useEffect } from "react"
import { useQuery } from "@apollo/client"
import { GET_PRODUCTS } from "../query/products";
import styled from "styled-components";

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

export const GoodsList = ({
  currentCategory,
  currentCurrency
})=>{
  const [currentProducts,setCurrentProducts]=useState([])
  const {data,loading}=useQuery(GET_PRODUCTS,{
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
                loading
                ?<h1>Loading...</h1>
                :currentProducts?.map(item=>(
                    <Card key={item.id}>
                      <CardBody>
                        <GoodsImg src={item.gallery[0]}/>
                        <GoodsTitle>{item.name}</GoodsTitle>
                        {
                          item.prices.map(price=>(
                            price.currency.symbol===currentCurrency.symbol&&<GoodsPrice>{currentCurrency.symbol}{price.amount}</GoodsPrice>
                          ))
                        }
                      </CardBody>
                    </Card>
                ))
            }
        </GoodsLostEl>    
    )
}