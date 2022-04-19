import PropTypes from 'prop-types';
import BooksList from './BooksList';

const Shelf = ({booksList, updateShelf}) => {
    const shelvesInfo = {
        currentlyReading: 'Currently Reading',
        wantToRead: 'Want To Read',
        read: 'Read',
    };

    return(
        Object.keys(booksList).map((shelf) => (
            <div key={shelf} >
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelvesInfo[shelf]}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            <BooksList books={booksList[shelf]} onUpdateShelf={updateShelf} />
                        </ol>
                    </div>
                </div>
            </div>
        ))
    )
}

Shelf.propTypes = {
    booksList: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired,
}

export default Shelf;