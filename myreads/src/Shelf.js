import PropTypes from 'prop-types';
import BookInfo from './BookInfo';

const Shelf = ({ books, shelf, onUpdateShelf }) => {
    return (
        books.map((book) => (
            <li key={book.id}>
                <BookInfo book={book} shelf={shelf} onChangeShelf={onUpdateShelf} />
            </li>
        ))
    )
}

Shelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
}

export default Shelf;