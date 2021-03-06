import {combineReducers} from 'redux'
import productReducer from './productReducer'
import categoryReducer from './categoryReducer'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  cart: cartReducer,
})

export default rootReducer
