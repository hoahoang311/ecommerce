import * as types from '../types'

export const setCategory = (categories) => {
  return {
    type: types.SET_CATEGORY,
    payload: categories,
  }
}

export const setActiveCategory = (category) => {
  return {
    type: types.SET_ACTIVE_CATEGORY,
    payload: category,
  }
}
