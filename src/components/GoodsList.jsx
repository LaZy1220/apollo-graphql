import { useState,useEffect } from "react"
import { useQuery } from "@apollo/client"
import { GET_PRODUCTS } from "../query/products";
import styled from "styled-components";

const Card = styled.div``
const GoodsTitle = styled.p``
const GoodsImg = styled.img``
const GoodsPrice = styled.span``

export const GoodsList = ({currentCategory})=>{
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
        <>
            {
                loading
                ?<h1>Loading...</h1>
                :currentProducts?.map(item=>(
                    <Card key={item.id}>
                        <GoodsImg src={item.gallery[0]}/>
                        <GoodsTitle>{item.name}</GoodsTitle>
                    </Card>
                ))
            }
        </>    
    )
}