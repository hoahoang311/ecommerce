import {SET_PRODUCTS, SET_GLOBAL_CURRENCY} from '../types'

const initialState = {
  products: [],
  currency: {currency: 'USD', symbol: '$'},
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    case SET_GLOBAL_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      }
    default:
      return state
  }
}

export default productReducer
