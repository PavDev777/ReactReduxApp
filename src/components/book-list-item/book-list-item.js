import React from 'react'
import classes from './book-list-item.module.css'

const BookListItem = ({ book, onAddedToCart }) => {
    const { title, author, price, coverImage } = book

    return (
        <div className={classes.BookListItem}>
            <div className={classes.BookCover}>
                <img className={classes.BookImage} src={coverImage} alt="cover"/>
            </div>
            <div className={classes.BookDetails}>
                <span className={classes.BookTitle}> {title} </span>
                <div className='book-aithor'> {author} </div>
                <div className={classes.BookPrice}> {price} </div>
                <button onClick={onAddedToCart} className='btn btn-info add-to-cart'> Add To Cart </button>
            </div>
        </div>
    )
}
export default BookListItem