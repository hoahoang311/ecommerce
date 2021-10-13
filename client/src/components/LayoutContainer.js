import React, {Component} from 'react'
import routes from '../pages'
import '../styles/Layout.css'

import Header from './Header'

class LayoutContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeCategory: null,
      productList: [],
      displayOverlay: false,
      displayCartDropDown: false,
    }
  }

  setCart = () => {
    this.setState({displayCartDropDown: !this.state.displayCartDropDown})
  }

  render () {
    const {displayCartDropDown} = this.state
    const {currencies, categories} = this.props

    return (
      <div
        className={`container ${
          displayCartDropDown ? 'display-dropdown' : 'no-dropdown'
        }`}>
        <nav className='header'>
          <Header
            categories={categories}
            currencies={currencies}
            setCart={() => this.setCart()}
            displayCartDropDown={displayCartDropDown}
          />
        </nav>
        <main className='main'>{routes}</main>
      </div>
    )
  }
}

export default LayoutContainer
