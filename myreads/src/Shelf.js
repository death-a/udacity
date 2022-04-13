import PropTypes from 'prop-types';
import BookInfo from './BookInfo';

const Shelf = ({ books, shelf }) => {
    return (
        books.map((book) => (
            <li key={book.id}>
                <BookInfo book={book} shelf={shelf} />
            </li>
        ))
    )
}

Shelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
}

export default Shelf;