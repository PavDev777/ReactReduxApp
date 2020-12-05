import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './components/app/app'
import { BookstoreServiceProvider } from './components/bookstore-service-context/bookstore-service-context'
import ErrorBoundty from './components/error-boundry/error-boundry'
import BookstoreService from './services/bookstore-service'
import store from './store'


const bookstoreService = new BookstoreService()

ReactDOM.render(
    <Provider store={store} >
        <ErrorBoundty>
            <BookstoreServiceProvider value={bookstoreService}>
                <BrowserRouter>
                    <App />
                    
                </BrowserRouter>
            </BookstoreServiceProvider>
        </ErrorBoundty>
    </Provider>,
    document.getElementById('root')
)



