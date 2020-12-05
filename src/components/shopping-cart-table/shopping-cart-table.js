import React from 'react'
import { connect } from 'react-redux'
import { allBooksRemovedFromCart, bookAddedToCart, bookRemovedFromCart } from '../../actions'
import classes from './shopping-cart-table.module.css'

const ShoppingCartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {
    const renderRow = (item, idx) => {
        const { id, title, count, total } = item
        return (
            <tr key={id}>
                <td> {idx + 1} </td>
                <td> {title} </td>
                <td> {count} </td>
                <td> ${total} </td>
                <td>
                    <button onClick={() => onDelete(id)} className="btn btn-outline-danger btn-sm float-right">
                        <i className="fa fa-trash-o" />
                    </button>
                    <button onClick={() => onIncrease(id)} className="btn btn-outline-success btn-sm float-right">
                        <i className="fa fa-plus-circle" />
                    </button>
                    <button onClick={() => onDecrease(id)} className="btn btn-outline-warning btn-sm float-right">
                        <i className="fa fa-minus-circle" />
                    </button>
                </td>
            </tr>
        )
    }
    return (
        <div className={classes.ShoppingCartTable} >
            <h2>Your Order</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>item</th>
                        <th>count</th>
                        <th>price</th>
                        <th>action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        items.map(renderRow)
                    }
                </tbody>
            </table>

            <div className={classes.ShoppingCartTotal}>
                Total: ${total}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {      
    return {
        items: state.cartItems,
        total: state.orderTotal
    }
}

const mapDispatchToProps = {
    
        onIncrease: bookAddedToCart,
        onDecrease: bookRemovedFromCart,
        onDelete: allBooksRemovedFromCart
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)
