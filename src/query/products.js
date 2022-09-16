import {gql} from '@apollo/client'

export const GET_PRODUCTS = gql`
query getProducts($title:String!){
 	category(input:{title:$title}){
   products{
    attributes{items{displayValue id value} id name type}
    id 
    name 
    brand
    gallery 
    inStock 
    prices{currency{symbol}amount} 
    
  } 
  }
}
`