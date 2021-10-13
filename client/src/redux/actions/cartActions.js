import * as types from '../types'

export const addItemToCart = (item) => {
  return {
    type: types.ADD_ITEM_TO_CART,
    payload: item,
  }
}

export const increaseQuantity = (items) => {
  return {
    type: types.INCREASE_QUANTITY,
    payload: items,
  }
}

export const updateQuantityInCart = (state) => {
  return {
    type: types.UPDATE_QUANTITY_IN_CART,
    payload: state,
  }
}
