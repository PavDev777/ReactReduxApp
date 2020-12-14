import React from 'react'
import { connect } from 'react-redux'
import BookListItem from '../book-list-item/book-list-item'
import withBooksstoreService from '../hoc/with-bookstore-service'
import { bookAddedToCart, fetchBooks } from '../../actions/index'
import Spinner from '../spinner/spinner'
import ErrorIndicator from '../error-indicator/error-indicator'


const BookList = ({ books, onAddedToCart }) => {
    return (
        <ul>
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem book={book} onAddedToCart={() => onAddedToCart(book.id)} />
                        </li>
                    )
                })
            }
        </ul>
    )
}

class BookListContainer extends React.Component {

    componentDidMount() {
        this.props.fetchBooks()
    }

    render() {
        const { books, loading, error, onAddedToCart } = this.props

        if (loading) {
            return <Spinner />
        }

        if (error) {
            return <ErrorIndicator />
        }

        return <BookList books={books} onAddedToCart={onAddedToCart} />
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.bookList.books,
        loading: state.bookList.loading,
        error: state.bookList.error
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { bookstoreService } = ownProps
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    }
}

export default withBooksstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookListContainer)) 