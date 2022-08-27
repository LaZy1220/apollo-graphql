import {gql} from '@apollo/client'

export const GET_PRODUCTS = gql`
query getProducts($title:String!){
 	category(input:{title:$title}){
   products{
    id 
    name 
    brand
    gallery 
    inStock 
    prices{currency{symbol}amount} 
    attributes{items{displayValue id value} id name type}
  } 
  }
}
`