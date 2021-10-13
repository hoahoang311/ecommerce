import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {setGlobalCurrency} from '../redux/actions/productActions'

class CurrencySelection extends Component {
  constructor (props) {
    super(props)
    this.setContainerRef = this.setContainerRef.bind(this)
  }

  handleClickOutside = () => {
    if (this.containerRef && !this.containerRef.contains(event.target)) {
      this.props.handleClose()
    }
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

  onClick = (currency) => {
    this.props.setGlobalCurrency(currency)
  }

  render () {
    const {currencies} = this.props

    return (
      <div className='currency-selection' ref={this.setContainerRef}>
        {currencies.map((c, idx) => {
          return (
            <div
              key={idx}
              className='currency'
              onClick={() => {
                this.onClick(c)
                this.props.handleClose()
              }}>
              <div
                className='currency-symbol'
                value={c.currency}>{`${c.symbol} ${c.currency}`}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

CurrencySelection.propTypes = {
  setGlobalCurrency: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  product: state.product,
})

export default connect(mapStateToProps, {setGlobalCurrency})(CurrencySelection)
