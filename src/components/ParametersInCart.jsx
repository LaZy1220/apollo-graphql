import styled from "styled-components"

const BoxItems = styled.div`
    display:flex;
    gap: 8px;
`
const ColorBox = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width: 32px;
    height: 32px;
`
const BoxAtribute = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    border:1px solid var(--black);
    width: 63px;
    height: 45px;
`

export const ParametersInCart = ({
    atr,
    chooseItemAttribute
}) =>{
    return(
        <>
        <span style={{margin:'16px 0 8px',display:'block',fontSize:'18px',fontWeight:'var(--fw-bold)',textTransform:'uppercase'}}>{(atr?.name)}:</span>
                                <BoxItems>
                                {
                                    atr.items.map((item,index)=>(
                                        atr.id==='Color'
                                        ?<ColorBox
                                            id={item.id} 
                                            key={item.id}
                                            className={chooseItemAttribute[0].value==='none'
                                                        ?index===0&&'activeColor'
                                                        :chooseItemAttribute.map(color=>{
                                                            if(color.value===item.value){
                                                                return 'activeColor'
                                                            }
                                                            else return ''
                                            })}
                                            style={{backgroundColor:`${item.value}`,border:`${item.value ==='#FFFFFF'?'1px solid var(--black)':'none'}`}}
                                            />                                           
                                        :(<BoxAtribute
                                            key={item.id}
                                            id={item.id}
                                            className={chooseItemAttribute[0].value==='none'
                                                        ?index===0&&'activeSomeParametrs'
                                                        :chooseItemAttribute.map(atributte=>{
                                                            if(atributte.value===item.value&&atributte.label===atr.name){
                                                                return 'activeSomeParametrs'
                                                            }
                                                            else return ''
                                            })}
                                            style={{overflow:'hidden'}}>
                                            <span style={{fontFamily:'var(--sspro)',fontSize:'16px'}}>{item.value}</span>
                                          </BoxAtribute>) 
                                    ))
                                }
                                </BoxItems>
        </>
    )
}