
const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [],
    orderTotal: 220
}

const updateCartItems = (cartItems, item, idx) => {

    if (item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1)
        ]
    }

    if (idx === -1) {   //добавление нового элемента в массив
        return [
            ...cartItems,  //все элементы cartItems
            item        //конкретный элемент cartItems
        ]
    }

    return [   //обновление существующего cartItems
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1)
    ]
}

const updateCartItem = (book, item = {}, quantity) => {  //книга которая добовляется к заказу, элемент списка заказа который будет обновляться

    const { id = book.id, count = 0, title = book.title, total = 0 } = item //если нет значений в item, то даем их по умолчанию
    return {
        id,
        count: count + quantity,
        title,
        total: total + quantity * book.price
    }
}

const updateOrder = (state, bookId, quantity) => {
    const { books, cartItems } = state

    const book = books.find(({ id }) => id === bookId)  //сравнивание id книги и id книги на которую кликнули
    const itemIndex = cartItems.findIndex(({ id }) => id === bookId) //ищем индекс этого элемента в your order в массиве, у которого id такой же как и у книги
    const item = cartItems[itemIndex] //получаем сам элемент, который находится в списке Your order и в массиве cartItems

    const newItem = updateCartItem(book, item, quantity)
    return {
        ...state,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    }
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null
            }

        case 'FETCH_BOOKS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case 'BOOK_ADDED_TO_CART':
            return updateOrder(state, action.payload, 1)


        case 'BOOK_REMOVED_FROM_CART':
            return updateOrder(state, action.payload, -1)

        case 'ALL_BOOKS_REMOVED_FROM_CART':
            const item = state.cartItems.find(({ id }) => id === action.payload)
            return updateOrder(state, action.payload, -item.count)

        default: return state
    }
}
export default reducer