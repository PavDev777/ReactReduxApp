import React from 'react'
import { BookstoreServiceConsumer } from '../bookstore-service-context/bookstore-service-context'

const withBooksstoreService = () => (Wrapped) => {

    return (props) => {
        return (
            <BookstoreServiceConsumer>
                {
                    (bookstoreService) => {
                        return (<Wrapped {...props} bookstoreService={bookstoreService} />)
                    }
                }
            </BookstoreServiceConsumer>
        )
    }
} 
export default withBooksstoreService