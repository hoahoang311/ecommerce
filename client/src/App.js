import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {QueryParamProvider} from 'use-query-params'
import {Provider} from 'react-redux'
import _ from 'lodash'
import client from './graphql/client'
import {queries} from './graphql/queries'
import store from './redux/store'
import LayoutContainer from './components/LayoutContainer'

class App extends Component {
  constructor () {
    super()

    this.state = {
      idLoading: true,
      categories: [],
      currencies: [],
      error: null,
    }
  }

  componentDidMount () {
    client
      .query({
        query: queries.GET_CATEGORIES,
        errorPolicy: 'all',
      })
      .then((result) => {
        const {products} = result.data.category
        const categories = _.chain(products)
          .groupBy('category')
          .map((a) => a)
          .value()
          .map((a) => a[0].category)
        categories.unshift('all')
        categories.sort()

        this.setState({
          isLoading: result.loading,
          categories,
        })
      })
      .catch((error) => this.setState({error}))

    client
      .query({
        query: queries.GET_CURRENCIES,
        errorPolicy: 'all',
      })
      .then((result) => {
        const {currencies} = result.data
        let symbol = []
        currencies.map((c) => {
          if (c == 'USD') symbol.push('$')
          if (c == 'GBP') symbol.push('£')
          if (c == 'JPY') symbol.push('¥')
          if (c == 'RUB') symbol.push('₽')
          if (c == 'AUD') symbol.push('A$')
        })
        let formattedCurrencies = []
        for (var i = 0; i < currencies.length; i++) {
          formattedCurrencies.push({currency: currencies[i], symbol: symbol[i]})
        }
        this.setState({currencies: formattedCurrencies})
      })
  }

  render () {
    const {isLoading, categories, currencies} = this.state

    return (
      !isLoading && (
        <Provider store={store}>
          <BrowserRouter basename={'/'}>
            <QueryParamProvider ReactRouterRoute={Route}>
              <LayoutContainer
                categories={categories}
                currencies={currencies}
              />
            </QueryParamProvider>
          </BrowserRouter>
        </Provider>
      )
    )
  }
}

export default App
