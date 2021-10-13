import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {isEmpty} from 'lodash'

import {SVGIcons} from '../res'
import CurrencySelection from './CurrencySelection'
import CartDropDown from './CartDropDown'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currency: '',
      displayCurrencySelection: false,
    }
  }

  handleToggleCurrencyDropDown = () => {
    this.setState({
      displayCurrencySelection: !this.state.displayCurrencySelection,
    })
  }

  handleToggleCartDropDown = () => {
    this.props.setCart()
  }

  render () {
    const {categories, currencies, category, displayCartDropDown} = this.props
    const {displayCurrencySelection} = this.state
    const {currency} = this.props.product
    const {items} = this.props.cart

    const getQuantity = () => {
      let quantity = 0

      if (!isEmpty(items)) {
        for (var i = 0; i < items.length; i++) {
          quantity = items[i].quantity + quantity
        }
      }

      return quantity
    }

    return (
      <>
        <div className='navbar'>
          {categories.map((c, index) => {
            return (
              <Link
                key={index}
                className={`navItem ${
                  c == category.activeCategory ? 'active-link' : undefined
                }`}
                to={`/${c}`}
                id={index}>
                {c}
              </Link>
            )
          })}
        </div>
        <Link to={'/'}>
          <img
            className='shopLogo'
            src={SVGIcons.LogoSVGIcon}
            alt={'Shop Logo'}
          />
        </Link>
        <div className='headerAction'>
          <div
            className='currency-sign'
            onClick={this.handleToggleCurrencyDropDown}>
            {currency ? currency.symbol : '$'}
            <img
              src={
                displayCurrencySelection
                  ? SVGIcons.ArrowUpSVGIcon
                  : SVGIcons.ArrowDownSVGIcon
              }
            />
          </div>
          {displayCurrencySelection && (
            <CurrencySelection
              currencies={currencies}
              handleClose={this.handleToggleCurrencyDropDown}
            />
          )}
          <img
            className='cart-action'
            src={SVGIcons.EmptyCartSVGIcon}
            alt={'Empty Cart'}
            onClick={this.handleToggleCartDropDown}
          />
          {!isEmpty(items) && getQuantity() > 0 && (
            <div className='item-in-cart'>{getQuantity()}</div>
          )}
          {displayCartDropDown && (
            <CartDropDown
              handleClose={() => this.props.setCart()}
              noOfItems={getQuantity()}
            />
          )}
          {displayCartDropDown && <div className='back-drop' />}
        </div>
      </>
    )
  }
}

Header.propTypes = {
  product: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  product: state.product,
  category: state.category,
  cart: state.cart,
})

export default connect(mapStateToProps, {})(Header)
