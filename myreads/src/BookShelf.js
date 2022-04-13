import Shelf from "./Shelf";
import PropTypes from 'prop-types';

const BookShelf = ({ booksList }) => {
    const shelvesInfo = [
        { currentlyReading: 'Currently Reading' },
        { wantToRead: 'Want To Read' },
        { read: 'Read' }
    ];
    return (    
        <div>
            {
                shelvesInfo.map((shelf) => {
                const key = (Object.keys(shelf))[0];
                return (
                    <ol key={key}> {shelf[key]}
                        <Shelf books={(booksList.filter(b => b.shelf === key))} />
                    </ol> 
                )
                })
            }
        </div>
    )
}

BookShelf.propTypes = {
    booksList: PropTypes.array.isRequired,
}

export default BookShelf;