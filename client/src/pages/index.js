import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ClothesPage from './ClothesPage'
import TechPage from './TechPage'
import ProductPage from './ProductPage'
import CartPage from './CartPage'
import NotFound from './NotFound'
import AllProductPage from './AllProductPage'

export default (
  <Switch>
    <Route exact path='/all' component={AllProductPage} />
    <Route exact path='/clothes' component={ClothesPage} />
    <Route exact path='/tech' component={TechPage} />
    <Route exact path='/product/:id' component={ProductPage} />
    <Route exact path='/cart' component={CartPage} />
    <Redirect exact from='/' to='/all' />
    <Route component={NotFound} />
  </Switch>
)
