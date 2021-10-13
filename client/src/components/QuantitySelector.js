import React, {Component} from 'react'
import {connect} from 'react-redux'

import {SVGIcons} from '../res'
import {updateQuantityInCart} from '../redux/actions/cartActions'

export class QuantitySelector extends Component {
  render () {
    const {selectedAttributes, product, quantity} = this.props

    return (
      <div className='quantity'>
        <img
          src={SVGIcons.PlusButtonSVGIcon}
          className='quantity-button'
          onClick={() => {
            this.props.updateQuantityInCart({
              product,
              selectedAttributes,
              quantity: quantity + 1,
            })
          }}
        />
        <div className='quantity-number'>{quantity}</div>
        <img
          src={SVGIcons.MinusButtonSVGIcon}
          className='quantity-button'
          onClick={() =>
            this.props.updateQuantityInCart({
              product,
              selectedAttributes,
              quantity: quantity - 1,
            })
          }
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
})

export default connect(mapStateToProps, {updateQuantityInCart})(
  QuantitySelector,
)
