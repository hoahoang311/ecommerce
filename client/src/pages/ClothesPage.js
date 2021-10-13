import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {isEmpty} from 'lodash'
import PropTypes from 'prop-types'
import client from '../graphql/client'

import {queries} from '../graphql/queries'
import '../styles/CategoryPage.css'
import {setActiveCategory} from '../redux/actions/categoryActions'
import ProductList from '../components/ProductList'

export class ClothesPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      products: [],
      category: [],
      error: null,
    }
  }

  componentDidMount () {
    this.props.setActiveCategory('clothes')
    client
      .query({
        query: queries.GET_PRODUCTS_IN_CATEGORY,
        variables: {title: {title: 'clothes'}},
        errorPolicy: 'all',
      })
      .then((res) => {
        this.setState({products: res.data.category.products})
      })
      .catch((error) => this.setState({error}))
  }

  render () {
    const {products} = this.state

    return (
      !isEmpty(products) && (
        <div className='category-page'>
          <div className='category-name'>
            {this.props.category.activeCategory}
          </div>
          <ProductList products={products} />
        </div>
      )
    )
  }
}

ClothesPage.propType = {
  category: PropTypes.object.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  category: state.category,
})

export default connect(mapStateToProps, {setActiveCategory})(
  withRouter(ClothesPage),
)
