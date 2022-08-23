import { useEffect,useState } from "react"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { GET_INFO_PRODUCTS } from "../query/infoProduct"
import styled from "styled-components"
import { Parameters } from "../components/Parameters"

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
export const ProductPage = ({
    currentCurrency,
    addOrder
})=>{ 
    const [currentImg,setCurrentImg] = useState(0)
    const [chooseAttributes,setChooseAtributes]=useState([])
    const [infoProduct,setInfoProduct]=useState([])
    const {id}  = useParams()
    const {data,loading,error}=useQuery(GET_INFO_PRODUCTS,{
        variables:{
          id:id
        }
      })
    const atrProductQuantity = infoProduct?.attributes?.length
    const chooseAtrProductQuantity = chooseAttributes.length
    const handleSwitchImg=(id)=>{
        setCurrentImg(id)
    }
    const handleChooseAttribute = (atribute,valueAtribute)=>{
        const atributeIndex = chooseAttributes.findIndex((itemAtribute)=>{return itemAtribute.label===atribute.name})
        if(atributeIndex<0){
            const newAtribute={
                label:atribute.name,
                value:valueAtribute.value,
            }
            setChooseAtributes([...chooseAttributes,newAtribute])
        }
        else{
            const newValue = chooseAttributes.map((itemAtribute)=>{
                if(itemAtribute.label===atribute.name){
                    return{
                        ...itemAtribute,
                        value:valueAtribute.value
                    }
                }
                else{
                    return itemAtribute
                }
            })
            setChooseAtributes(newValue)
        }
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
                            infoProduct?.gallery?.map((item,index)=>(
                                <Img 
                                key={index} 
                                src={item}  
                                className={index===currentImg?'activeImg':''}
                                onClick={()=>handleSwitchImg(index)}/>
                            ))
                        }
                    </ProductImgs>
                    <Info>
                        <ProductTitle>{infoProduct?.name}</ProductTitle>
                        <ProductBrend>{infoProduct?.brand}</ProductBrend>
                        {infoProduct?.attributes?.map(atr=>
                            (<Parameters 
                                key={atr.id}
                                chooseAttributes={chooseAttributes}
                                atr={atr}
                                handleChooseAttribute={handleChooseAttribute}
                                />))}
                             <p style={{fontSize:'18px',fontWeight:'var(--fw-bold)',margin:'38px 0 10px',fontFamily:'var(--roboto)'}}>PRICE:</p>
                            {
                        infoProduct?.prices?.map(price=>(
                            price.currency.symbol===currentCurrency.symbol
                            &&<p key={price.amount} style={{fontFamily:'var(--family)',fontWeight:'var(--fw-bold)',fontSize:'24px'}}>{currentCurrency.symbol}{price.amount}</p>
                          ))
                        }
                        <AddCartButton onClick={()=>addOrder(infoProduct, chooseAttributes,atrProductQuantity, chooseAtrProductQuantity)}>ADD TO CART</AddCartButton>
                        <div style={{fontFamily:'var(--roboto)'}} dangerouslySetInnerHTML={{__html:infoProduct?.description}}></div>
                    </Info>
                </Details>
            }
        </>
    )
}