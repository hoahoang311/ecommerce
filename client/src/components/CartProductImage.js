import React, {Component} from 'react'
import {SVGIcons} from '../res'

export class CartProductImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeImgIndex: 0,
    }
  }

  handleGoBack = () => {
    const {activeImgIndex} = this.state
    if (activeImgIndex !== 0)
      this.setState({activeImgIndex: activeImgIndex - 1})
  }

  handleGoForward = (noOfPhotos) => {
    const {activeImgIndex} = this.state
    if (activeImgIndex < noOfPhotos - 1)
      this.setState({activeImgIndex: activeImgIndex + 1})
  }

  render () {
    const {gallery} = this.props
    const {activeImgIndex} = this.state

    return (
      <div className='gallery-container'>
        <img
          className='image'
          src={gallery[activeImgIndex]}
          alt='product-image'
        />
        {gallery.length > 1 && (
          <div className='gallery-controller'>
            <img
              src={SVGIcons.ArrowLeftSVGIcon}
              className='arrow arrow-left'
              onClick={() => this.handleGoBack()}
              alt='arrow-left'
            />
            <img
              src={SVGIcons.ArrowRightSVGIcon}
              className='arrow arrow-right'
              onClick={() => this.handleGoForward(gallery.length)}
              alt='arrow-right'
            />
          </div>
        )}
      </div>
    )
  }
}

export default CartProductImage
