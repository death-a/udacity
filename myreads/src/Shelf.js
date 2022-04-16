import PropTypes from 'prop-types';
import BookInfo from './BookInfo';

const Shelf = ({ books, onUpdateShelf, shelfWiseBooks }) => {
    return (
        books.map((book) => (
            <li key={book.id}>
                <BookInfo book={book} onChangeShelf={onUpdateShelf} shelfWiseBooks={shelfWiseBooks} />
            </li>
        ))
    )
}

Shelf.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
}

export default Shelf;