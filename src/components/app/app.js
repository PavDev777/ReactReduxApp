import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CartPage from '../pages/cart-page'
import HomePage from '../pages/home-page'

const App = () => {

    return (
        <main role='main' className='container'>
            <Switch>
                <Route path='/' component={HomePage} exact />
                <Route path='/cart' component={CartPage} />
            </Switch>
        </main>
    )
}
export default App