import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {SVGIcons} from '../res'

class ProductListItem extends Component {
  render () {
    const {index, p, isHoverOver, activeIndex, currency, price} = this.props

    return (
      <Link
        ref={this.cardRef}
        onMouseOver={() => this.props.onMouseOver(index)}
        onMouseOut={() => this.props.onMouseOut()}
        // index={index}
        to={`/product/${p.id}`}
        className={`product ${
          isHoverOver && activeIndex == index ? 'product-selected' : undefined
        } ${!p.inStock ? 'product-out-of-stock' : undefined}`}>
        <img
          src={p.gallery[0]}
          alt={p.name}
          className={`product-img ${
            p.inStock ? 'product-img-instock' : 'product-img-out-of-stock'
          }`}
        />
        {!p.inStock && <div className='out-of-stock'>OUT OF STOCK</div>}
        <img
          src={SVGIcons.CartActionSVGIcon}
          className='cart-action'
          onClick={this.props.handleCartOnclick}
          value={index}
        />
        <div className='product-details'>
          <span>{p.name}</span>
          <span className='price'>{`${currency.symbol}${price.amount}`}</span>
        </div>
      </Link>
    )
  }
}

export default ProductListItem
