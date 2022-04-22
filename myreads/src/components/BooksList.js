import PropTypes from 'prop-types';
import BookInfo from './BookInfo';

const BooksList = ({ books, onUpdateShelf, shelfWiseBooks }) => {
    
    return (
        books.map((book) => (
            <li key={book.id}>
                <BookInfo book={book} onChangeShelf={onUpdateShelf} shelfWiseBooks={shelfWiseBooks} />
            </li>
        ))
    )
}

BooksList.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    shelfWiseBooks: PropTypes.object,
}

export default BooksList;