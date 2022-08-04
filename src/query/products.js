import {gql} from '@apollo/client'

export const GET_PRODUCTS = gql`
query getProducts($title:String!){
 	category(input:{title:$title}){
   products{
    name id gallery inStock prices{currency{symbol}amount} 
  } 
  }
}
`