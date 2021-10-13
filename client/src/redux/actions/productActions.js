import * as types from '../types'

export const setProduct = (products) => {
  return {
    type: types.SET_PRODUCTS,
    payload: products,
  }
}

export const setGlobalCurrency = (currency) => {
  return {
    type: types.SET_GLOBAL_CURRENCY,
    payload: currency,
  }
}
