import {gql} from '@apollo/client'

export const GET_PRODUCT = gql`
    query getProduct{
  category(input:{title:"all"}){
    products{
      name
    }
  }
}
`