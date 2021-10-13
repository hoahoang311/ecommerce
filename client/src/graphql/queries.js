import {gql} from '@apollo/client'

const GET_CATEGORIES = gql`
  query categories {
    category {
      name
      products {
        id
        inStock
        name
        category
        gallery
        prices {
          currency
          amount
        }
        brand
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`

const GET_PRODUCTS_IN_CATEGORY = gql`
  query category($title: CategoryInput) {
    category(input: $title) {
      name
      products {
        id
        name
        inStock
        category
        gallery
        prices {
          currency
          amount
        }
        brand
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`

const GET_CURRENCIES = gql`
  query currencies {
    currencies
  }
`

const GET_PRODUCT_BY_ID = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      brand
      prices {
        currency
        amount
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
`

export const queries = {
  GET_CATEGORIES,
  GET_CURRENCIES,
  GET_PRODUCTS_IN_CATEGORY,
  GET_PRODUCT_BY_ID,
}
