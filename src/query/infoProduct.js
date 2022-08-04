import {gql} from '@apollo/client'

export const GET_INFO_PRODUCTS = gql`
query getInfoProduct($id:String!){
 	product(id:$id){
    name 
    gallery 
    id 
    description 
    category 
    prices{currency{symbol}amount} 
    brand
    attributes{items{displayValue id value} id name type}
  }
}
`