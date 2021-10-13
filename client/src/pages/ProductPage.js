import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {isEmpty} from 'lodash'
import PropTypes from 'prop-types'

import client from '../graphql/client'
import {queries} from '../graphql/queries'
import '../styles/ProductPage.css'
import ProductContent from '../components/ProductContent'

export class ProductPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      product: null,
      activeImgIndex: 0,
      isHoverOver: false,
      activeThumbnail: null,
      selectedAttributes: [],
      error: null,
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

  componentDidMount () {
    const productId = this.props.match.params.id

    client
      .query({
        query: queries.GET_PRODUCT_BY_ID,
        variables: {id: productId},
        errorPolicy: 'all',
      })
      .then((res) => this.setState({product: res.data.product}))
      .catch((error) => this.setState({error}))
  }

  render () {
    const {
      product,
      isHoverOver,
      activeThumbnail,
      activeImgIndex,
      selectedAttributes,
    } = this.state

    return (
      product && (
        <div className='product-page'>
          <div className='img-container'>
            <div className='col-1'>
              {product.gallery.map((p, index) => {
                return (
                  <img
                    key={index}
                    src={p}
                    className={`thumbnail ${
                      isHoverOver && activeThumbnail == index
                        ? 'mouse-over'
                        : undefined
                    }`}
                    onMouseOver={() =>
                      this.setState({isHoverOver: true, activeThumbnail: index})
                    }
                    onMouseOut={() =>
                      this.setState({isHoverOver: false, activeThumbnail: null})
                    }
                    onClick={() => this.setState({activeImgIndex: index})}
                  />
                )
              })}
            </div>
            <img src={product.gallery[activeImgIndex]} className='main-photo' />
          </div>

          <div className='col-2'>
            <ProductContent
              singleProduct={product}
              selectedAttributes={selectedAttributes}
              handleAttributes={this.handleSelectedAttributes}
            />
          </div>
        </div>
      )
    )
  }
}

ProductPage.propType = {
  product: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  cart: state.cart,
})

export default connect(mapStateToProps, {})(withRouter(ProductPage))
