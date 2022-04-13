import PropTypes from 'prop-types';

const Shelf = ({ books }) => {
    return (
        books.map((book) => (
            <li key={book.id}>
            {`Title: ${book.title}, Shelf: ${book.shelf}, Authors: ${book.authors}`}
            </li>
        ))
    )
}

Shelf.propTypes = {
    books: PropTypes.array.isRequired,
}

export default Shelf;