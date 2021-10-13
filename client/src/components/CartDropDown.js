import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import '../styles/CartDropDown.css'
import CartDropDownItem from '../components/CartDropDownItem'

class CartDropDown extends Component {
  constructor (props) {
    super(props)
    this.setContainerRef = this.setContainerRef.bind(this)
  }

  handleClickOutside = () => {
    if (this.containerRef && !this.containerRef.contains(event.target)) {
      this.props.handleClose()
    }
  }

  handleOnclick = () => {
    this.props.handleClose()
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setContainerRef (node) {
    this.containerRef = node
  }

  render () {
    const {items} = this.props.cart
    const {currency} = this.props.product
    const {noOfItems} = this.props
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
        <div className='cart-dropdown' ref={this.setContainerRef}>
          <div className='cart-header'>
            <span className='my-bag'>My Bag, </span>
            <span>{noOfItems && noOfItems} items</span>
          </div>
          <div
            className={`item-container ${
              items.length > 3 ? 'long-list' : undefined
            }`}>
            {items.map((item, index) => {
              const {product, selectedAttributes, quantity} = item
              const price = product.prices.filter(
                (p) => p.currency == currency.currency,
              )[0].amount
              return (
                <CartDropDownItem
                  key={index}
                  product={product}
                  selectedAttributes={selectedAttributes}
                  quantity={quantity}
                  price={price}
                  currency={currency}
                />
              )
            })}
          </div>
          <div className='footer'>
            <div className='total'>
              <span>Total</span>
              <span className='amount'>{`${
                currency.symbol
              }${totalAmount.toFixed(2)}`}</span>
            </div>
            <div className='footer-button'>
              <Link
                className='button view-bag'
                to='/cart'
                onClick={this.handleOnclick}>
                VIEW BAG
              </Link>
              <Link
                className='button check-out'
                to='/checkout'
                onClick={this.handleOnclick}>
                CHECK OUT
              </Link>
            </div>
          </div>
        </div>
      )
    )
  }
}

CartDropDown.propTypes = {
  product: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  product: state.product,
})

export default connect(mapStateToProps, {})(CartDropDown)
