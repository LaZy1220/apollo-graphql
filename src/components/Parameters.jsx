import styled from "styled-components"

const BoxItems = styled.div`
    display:flex;
    gap:12px;
`
const ColorBox = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height: 45px;
    width: 63px;
    cursor: pointer;
`
const BoxAtribute = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height: 45px;
    width: 63px;
    border:1px solid var(--black);
    cursor: pointer;
`

export const Parameters = ({
    chooseAttributes,
    atr,
    handleChooseAttribute,
}) =>{
    return(
        <>
        <span style={{padding:'24px 0 8px',fontSize:'18px',fontFamily:'var(--roboto)',fontWeight:'var(--fw-bold)',display:'block'}}>{(atr?.name).toUpperCase()}:</span>
                                <BoxItems>
                                {
                                    atr.items.map((item)=>(
                                        atr.id==='Color'
                                        ?<ColorBox
                                            className={chooseAttributes.length
                                                ?chooseAttributes.map(color=>{
                                                    if(color.value===item.value){
                                                        return 'activeColor'
                                                    }
                                                })
                                                :''}
                                            id={item.id} 
                                            key={item.id}
                                            onClick={()=>handleChooseAttribute(atr,item)}
                                            style={{backgroundColor:`${item.value}`,border:`${item.value ==='#FFFFFF'?'1px solid var(--black)':'none'}`,height:'32px',width:'32px'}}
                                            />                                           
                                        :(<BoxAtribute
                                            key={item.id}
                                            id={item.id}
                                            onClick={()=>handleChooseAttribute(atr,item)}
                                            className={chooseAttributes.length
                                                ?chooseAttributes.map(atributte=>{
                                                    if(atributte.value===item.value&&atributte.label===atr.name){
                                                        return 'activeSomeParametrs'
                                                    }
                                                })
                                                :''}>
                                            <span style={{letterSpacing:'0.05em',fontFamily:'var(--sspro)'}}>
                                                  <span>{item.value}</span>
                                            </span>
                                          </BoxAtribute>) 
                                    ))
                                }
                                </BoxItems>
        </>
    )
}