import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SVGIcons} from '../res'
import {updateQuantityInCart} from '../redux/actions/cartActions'

export class CartDropDownItem extends Component {
  render () {
    const {quantity, product, selectedAttributes, currency, price} = this.props

    return (
      quantity > 0 && (
        <div className='item'>
          <div className='details'>
            <div className='detail-container'>
              <span>{product.brand}</span>
              <span>{product.name}</span>
              <span className='cart-item-price'>{`${currency.symbol}${price}`}</span>
            </div>
            <div className='attribute-container'>
              {product.attributes.map((attribute, index) => {
                const firstValue = attribute.items[0].value
                return firstValue !== 'Yes' ? (
                  <div className='attribute' key={index}>
                    {attribute.items.map((item, index) => {
                      const isSelected =
                        selectedAttributes.filter(
                          (a) => a.attribute == attribute.name,
                        )[0].item == item.value

                      return attribute.type !== 'swatch' ? (
                        <div
                          key={index}
                          className={`option ${
                            isSelected ? 'option-selected' : 'option-unselected'
                          }`}>
                          {item.value}
                        </div>
                      ) : (
                        <div
                          className={`${
                            isSelected
                              ? 'option-color-selected'
                              : 'option-color-unselected'
                          } ${
                            item.id == 'White'
                              ? 'option-color-white'
                              : undefined
                          }`}
                          style={{
                            backgroundColor: item.value,
                          }}
                          key={index}
                        />
                      )
                    })}
                  </div>
                ) : (
                  <div className='attribute' key={index}>
                    <span className='attribute-text'>{`${attribute.name}: ${
                      selectedAttributes.filter(
                        (a) => a.attribute == attribute.name,
                      )[0].item
                    }`}</span>
                  </div>
                )
              })}
            </div>
          </div>
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
            <div>{quantity}</div>
            <img
              src={SVGIcons.MinusButtonSVGIcon}
              className='quantity-button'
              onClick={() => {
                this.props.updateQuantityInCart({
                  product,
                  selectedAttributes,
                  quantity: quantity - 1,
                })
              }}
            />
          </div>
          <div className='item-img'>
            <img src={product.gallery[0]} />
          </div>
        </div>
      )
    )
  }
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, {updateQuantityInCart})(
  CartDropDownItem,
)
