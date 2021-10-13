import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import '../styles/CartPage.css'
import CartProductImage from '../components/CartProductImage'
import CartItemAttribute from '../components/CartItemAttribute'
import QuantitySelector from '../components/QuantitySelector'

class CartPage extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {items} = this.props.cart
    const {currency} = this.props.product

    let totalAmount = 0
    for (var i = 0; i < items.length; i++) {
      const amountPerItem =
        items[i].product.prices.filter(
          (p) => p.currency == currency.currency,
        )[0].amount * items[i].quantity

      totalAmount = totalAmount + amountPerItem
    }
    return (
      items && (
        <div className='cart-page'>
          <span className='title'>CART</span>
          <div className='item-container'>
            {items.map((item, index) => {
              const {product, selectedAttributes, quantity} = item
              const price = product.prices.filter(
                (p) => p.currency == currency.currency,
              )[0].amount

              return (
                quantity > 0 && (
                  <div className='item' key={index}>
                    <div className='details'>
                      <div className='detail-container'>
                        <span className='item-brand'>{product.brand}</span>
                        <span className='item-name'>{product.name}</span>
                        <span className='item-price'>{`${currency.symbol}${price}`}</span>
                      </div>
                      <div className='attribute-container'>
                        {product.attributes.map((attribute, index) => {
                          const firstValue = attribute.items[0].value
                          return (
                            <CartItemAttribute
                              key={index}
                              attribute={attribute}
                              firstValue={firstValue}
                              selectedAttributes={selectedAttributes}
                            />
                          )
                        })}
                      </div>
                    </div>
                    <div className='item-img'>
                      <QuantitySelector
                        product={product}
                        selectedAttributes={selectedAttributes}
                        quantity={quantity}
                      />
                      <CartProductImage gallery={product.gallery} />
                    </div>
                  </div>
                )
              )
            })}
          </div>
        </div>
      )
    )
  }
}

CartPage.propTypes = {
  product: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  product: state.product,
})

export default connect(mapStateToProps, {})(CartPage)
