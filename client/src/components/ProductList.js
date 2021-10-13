import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ProductListItem from './ProductListItem'
import QuickCartAction from './QuickCartAction'

class ProductList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isHoverOver: false,
      activeIndex: null,
      displayQuickCartAction: false,
      selectedIndex: null,
    }
  }

  onMouseOver = (key) => {
    this.setState({isHoverOver: true, activeIndex: key})
  }

  onMouseOut = () => {
    this.setState({isHoverOver: false, activeIndex: null})
  }

  handleCartOnclick = (e) => {
    e.preventDefault()
    this.setState({
      displayQuickCartAction: true,
      selectedIndex: e.target.getAttribute('value'),
    })
  }

  handleCloseQuickCartAction = () => {
    this.setState({displayQuickCartAction: false})
  }

  render () {
    const {products} = this.props
    const {currency} = this.props.product
    const {
      isHoverOver,
      activeIndex,
      displayQuickCartAction,
      selectedIndex,
    } = this.state

    return (
      <div className='product-list'>
        {products.map((p, index) => {
          const price = p.prices.filter(
            (p) => p.currency == currency.currency,
          )[0]

          if (displayQuickCartAction == true && index == selectedIndex) {
            return (
              <QuickCartAction
                singleProduct={p}
                key={index}
                handleClose={this.handleCloseQuickCartAction}
              />
            )
          } else {
            return (
              <ProductListItem
                key={p.id}
                index={index}
                p={p}
                displayQuickCartAction={displayQuickCartAction}
                isHoverOver={isHoverOver}
                activeIndex={activeIndex}
                price={price}
                currency={currency}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                handleCartOnclick={this.handleCartOnclick}
                selectedIndex={selectedIndex}
              />
            )
          }
        })}
      </div>
    )
  }
}

ProductList.propType = {
  category: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  category: state.category,
  product: state.product,
})

export default connect(mapStateToProps, {})(ProductList)
