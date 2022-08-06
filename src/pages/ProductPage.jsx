import { useEffect,useState } from "react"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { GET_INFO_PRODUCTS } from "../query/infoProduct"
import styled from "styled-components"

const Details =styled.div`
    display: flex;
    justify-content: space-between;
    padding: 72px 122px 178px 0;
`
const Info = styled.div`
    max-width: 292px;
`
const ProductImgs = styled.div`
    display: flex;
    flex-direction: column;
    gap:33px;
`
const Img = styled.img`
    cursor: pointer;
    width: 80px;
    height: 80px;
`
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
    const [currentImg,setCurrentImg] = useState(0)
    const {id}  = useParams()
    const {data,loading,error}=useQuery(GET_INFO_PRODUCTS,{
        variables:{
          id:id
        }
      })
    const handleSwitchImg=(id)=>{
        setCurrentImg(id)
    }      
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
                        {
                            infoProduct?.gallery.map((item,index)=>(
                                <Img key={index} 
                                src={item} 
                                id={index} 
                                className={index===currentImg?'activeImg':''}
                                onClick={()=>handleSwitchImg(index)}/>
                            ))
                        }
                    </ProductImgs>
                    <Info>
                        <ProductTitle>{infoProduct?.name}</ProductTitle>
                        <ProductBrend>{infoProduct?.brand}</ProductBrend>
                        {infoProduct?.attributes.map(atr=>
                            (<Parameters key={atr.id}>
                                <span style={{ padding:'24px 0 8px',fontSize:'18px',fontFamily:'var(--roboto)',fontWeight:'var(--fw-bold)',display:'block'}}>{(atr?.name).toUpperCase()}:</span>
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
                             <p style={{fontSize:'18px',fontWeight:'var(--fw-bold)',margin:'38px 0 10px',fontFamily:'var(--roboto)'}}>PRICE:</p>
                            {
                        infoProduct?.prices.map(price=>(
                            price.currency.symbol===currentCurrency.symbol
                            &&<Price key={price.amount}><p style={{fontFamily:'var(--family)',fontWeight:'var(--fw-bold)',fontSize:'24px'}}>{currentCurrency.symbol}{price.amount}</p></Price>
                          ))
                        }
                        <AddCartButton>ADD TO CART</AddCartButton>
                        <div style={{fontFamily:'var(--roboto)'}} dangerouslySetInnerHTML={{__html:infoProduct?.description}}></div>
                    </Info>
                </Details>
            }
        </>
    )
}