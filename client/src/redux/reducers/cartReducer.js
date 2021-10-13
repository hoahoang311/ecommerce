import {isEmpty} from 'lodash'
import * as types from '../types'

const initialState = {
  items: [],
  isCartOpened: false,
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ITEM_TO_CART: {
      const newArray = [...state.items, action.payload]

      newArray.map((item, index) => {
        return (item.id = index)
      })
      return {
        ...state,
        items: newArray,
      }
    }
    case types.INCREASE_QUANTITY: {
      const {product, selectedAttributes} = action.payload
      const differentProducts = state.items.filter(
        (i) => i.product.id !== product.id,
      )
      const sameProducts = state.items.filter((i) => i.product.id == product.id)

      const attributesMatched = sameProducts.filter((item) => {
        item.selectedAttributes.sort()
        selectedAttributes.sort()

        const isAttributeMatched = item.selectedAttributes.every(
          (element, index) => {
            return element.item == selectedAttributes[index].item
          },
        )

        if (isAttributeMatched) return item
      })

      const attributesNotMatched = sameProducts.filter((item) => {
        item.selectedAttributes.sort()
        selectedAttributes.sort()

        const isAttributeMatched = item.selectedAttributes.every(
          (element, index) => {
            return element.item == selectedAttributes[index].item
          },
        )

        if (!isAttributeMatched) return item
      })

      if (!isEmpty(attributesNotMatched)) {
        let quantity = attributesMatched[0].quantity
        attributesMatched[0].quantity = quantity + 1

        const newArray = differentProducts.concat(attributesNotMatched)
        return {
          items: [...newArray, {...attributesMatched[0]}].sort((a, b) =>
            a.id < b.id ? 1 : -1,
          ),
        }
      } else {
        let quantity = attributesMatched[0].quantity
        attributesMatched[0].quantity = quantity + 1

        return {
          items: [...differentProducts, {...attributesMatched[0]}].sort(
            (a, b) => (a.id < b.id ? 1 : -1),
          ),
        }
      }
    }
    case types.UPDATE_QUANTITY_IN_CART: {
      const {product, selectedAttributes, quantity} = action.payload
      const differentProducts = state.items.filter(
        (i) => i.product.id !== product.id,
      )
      const sameProducts = state.items.filter((i) => i.product.id == product.id)

      const attributesMatched = sameProducts.filter((item) => {
        item.selectedAttributes.sort()
        selectedAttributes.sort()

        const isAttributeMatched = item.selectedAttributes.every(
          (element, index) => {
            return element.item == selectedAttributes[index].item
          },
        )

        if (isAttributeMatched) return item
      })

      const attributesNotMatched = sameProducts.filter((item) => {
        item.selectedAttributes.sort()
        selectedAttributes.sort()

        const isAttributeMatched = item.selectedAttributes.every(
          (element, index) => {
            return element.item == selectedAttributes[index].item
          },
        )

        if (!isAttributeMatched) return item
      })

      const newArray = differentProducts.concat(attributesNotMatched)
      attributesMatched[0].quantity = quantity

      if (quantity == 0) {
        return {
          items: [...newArray].sort((a, b) => (a.id < b.id ? 1 : -1)),
        }
      } else {
        return {
          items: [...newArray, {...attributesMatched[0]}].sort((a, b) =>
            a.id < b.id ? 1 : -1,
          ),
        }
      }
    }

    default:
      return state
  }
}

export default cartReducer
