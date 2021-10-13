import {SET_ACTIVE_CATEGORY, SET_CATEGORY} from '../types'

const initialState = {
  category: [],
  activeCategory: null,
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      }
    case SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload,
      }
    default:
      return state
  }
}

export default categoryReducer
