import React, {Component} from 'react'
import {isEmpty} from 'lodash'
import {connect} from 'react-redux'

import {addItemToCart, increaseQuantity} from '../redux/actions/cartActions'
import {ProductAttribute} from './ProductAttribute'
import '../styles/QuickCartAction.css'

class QuickCartAction extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedAttributes: [],
    }
  }

  handleSelectedAttributes = (attribute, selectedOption) => {
    const {selectedAttributes} = this.state
    const newArray = {attribute: attribute, item: selectedOption}
    if (isEmpty(selectedAttributes)) {
      this.setState({
        selectedAttributes: [newArray],
      })
    } else {
      if (!selectedAttributes.find((a) => a.attribute == attribute)) {
        this.setState({
          selectedAttributes: [...this.state.selectedAttributes, newArray],
        })
      } else {
        const array = selectedAttributes
          .filter((a) => a.attribute !== attribute)
          .concat(newArray)
        this.setState({selectedAttributes: array})
      }
    }
  }

  render () {
    const {currency} = this.props.product
    const {singleProduct, handleClose} = this.props
    const {selectedAttributes} = this.state
    const {items} = this.props.cart

    const getPrice = () => {
      let price
      if (singleProduct) {
        price = singleProduct.prices.filter(
          (p) => p.currency == currency.currency,
        )[0].amount
      }
      return price
    }

    const hasSelectedAllOptions = () => {
      if (isEmpty(singleProduct.attributes)) {
        return true
      } else {
        if (
          !isEmpty(selectedAttributes) &&
          singleProduct.attributes.length == selectedAttributes.length
        ) {
          return true
        } else return false
      }
    }

    const isExistingProduct = () => {
      const matchingProduct = items.filter(
        (p) => p.product.id == singleProduct.id,
      )

      if (matchingProduct) {
        for (var i = 0; i < matchingProduct.length; i++) {
          matchingProduct[i].selectedAttributes.sort()
          selectedAttributes.sort()

          const isAttributeMatched = matchingProduct[
            i
          ].selectedAttributes.every((element, index) => {
            return element.item === selectedAttributes[index].item
          })

          if (isAttributeMatched) {
            return isAttributeMatched
          } else if (i === matchingProduct.length) return false
        }
      } else return false
    }

    return (
      <div className='product product-selected quick-cart-action'>
        <div className='wrapper'>
          <div className='close-button' onClick={handleClose}>
            X
          </div>
          <span className='product-brand'>{singleProduct.brand}</span>
          <span className='product-name'>{singleProduct.name}</span>
          {!isEmpty(singleProduct.attributes) && (
            <ProductAttribute
              attributes={singleProduct.attributes}
              handleAttributes={this.handleSelectedAttributes}
              selectedAttributes={selectedAttributes}
            />
          )}
          <div className='product-price'>
            <span className='title'>
              PRICE: {getPrice() && `${currency.symbol}${getPrice()}`}
            </span>
          </div>
          <div className='cart-quick-action'>
            <span className='error-message'>
              {!hasSelectedAllOptions() &&
                singleProduct.inStock &&
                this.state.error}
            </span>
            <div
              className='add-to-cart instock'
              onClick={() => {
                if (singleProduct.inStock && hasSelectedAllOptions()) {
                  if (isExistingProduct()) {
                    this.props.increaseQuantity({
                      product: singleProduct,
                      selectedAttributes,
                    })
                  } else {
                    this.props.addItemToCart({
                      product: singleProduct,
                      selectedAttributes,
                      quantity: 1,
                    })
                  }
                } else this.setState({error: 'Please select all attributes'})
              }}>
              <span>ADD TO CART</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
  cart: state.cart,
})

export default connect(mapStateToProps, {addItemToCart, increaseQuantity})(
  QuickCartAction,
)
