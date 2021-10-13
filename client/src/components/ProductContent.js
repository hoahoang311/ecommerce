import React, {Component} from 'react'
import {connect} from 'react-redux'
import {isEmpty} from 'lodash'
import {ProductAttribute} from '../components/ProductAttribute'
import {addItemToCart, increaseQuantity} from '../redux/actions/cartActions'

export class ProductContent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null,
    }
    this.descriptionRef = React.createRef()
  }

  componentDidMount () {
    if (this.descriptionRef.current && this.props.singleProduct)
      this.descriptionRef.current.innerHTML = this.props.singleProduct.description
  }

  render () {
    const {currency} = this.props.product
    const {items} = this.props.cart
    const {singleProduct, selectedAttributes} = this.props

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
      <div className='product-content'>
        <span className='product-brand'>{singleProduct.brand}</span>
        <span className='product-name'>{singleProduct.name}</span>
        {!isEmpty(singleProduct.attributes) && (
          <ProductAttribute
            attributes={singleProduct.attributes}
            handleAttributes={this.props.handleAttributes}
            selectedAttributes={selectedAttributes}
          />
        )}
        <div className='product-price'>
          <span className='title'>PRICE:</span>
          <span className='price'>
            {getPrice() && `${currency.symbol}${getPrice()}`}
          </span>
        </div>
        <div className='cart-action'>
          <div
            className={`add-to-cart ${
              singleProduct.inStock ? 'instock' : 'out-of-stock'
            }`}
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
            <span>
              {singleProduct.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
            </span>
          </div>
          <span className='error-message'>
            {!hasSelectedAllOptions() &&
              singleProduct.inStock &&
              this.state.error}
          </span>
        </div>
        <div ref={this.descriptionRef} className='description' />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
  cart: state.cart,
})

export default connect(mapStateToProps, {addItemToCart, increaseQuantity})(
  ProductContent,
)
