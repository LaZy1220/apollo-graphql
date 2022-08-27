import { useState,useEffect } from "react"
import { useQuery } from "@apollo/client"
import { GET_PRODUCTS } from "../query/products";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom'

const GoodsListEl = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(336px,1fr));
  grid-gap:40px;
  padding-bottom: 190px;
`
const Card = styled.div`
  cursor: pointer;
  margin-top: 60px;
  padding: 16px;
  position: relative;
  &:hover{
    box-shadow:var(--shadow);
    .card-button{display:flex}};
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
const ButtonAddCart = styled.div`
  width: 52px;
  height: 52px;
  background: #5ECE7B;
  border-radius: 50%;
  position: absolute;
  bottom: 55px;
  right: 31px;
  display: none;
  align-items: center;
  justify-content: center;
`

export const GoodsList = ({
  currentCategory,
  currentCurrency,
  addOrder,
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
        <GoodsListEl>
            {
              error&&<h3>Sorry, we have a problem, try again</h3>
            }
            {
                loading
                ?<h1>Loading...</h1>
                :currentProducts?.map(item=>(
                    <Card 
                      key={item.id}
                      onClick={()=>navigate(`/product/${item.id}`)}>
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
                            price.currency.symbol===currentCurrency.symbol
                            &&<GoodsPrice key={price.amount}><span style={{fontFamily:'var(--raleway)',fontWeight:'var(--fw-hard)'}}>{currentCurrency.symbol}{price.amount}</span></GoodsPrice>
                          ))
                        }
                        <ButtonAddCart 
                          className="card-button"
                          onClick={(event)=>{
                            event.stopPropagation()
                            addOrder(item)}}>
                          <img style={{width:'24px',heigth:'24px'}} src="/images/Cart-white.svg" alt="cart" />
                        </ButtonAddCart>
                    </Card>
                ))               
            }           
        </GoodsListEl>    
    )
}