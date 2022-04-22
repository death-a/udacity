import PropTypes from 'prop-types';

const BookInfo = ({ book, onChangeShelf, shelfWiseBooks }) => {
    const getShelfValue = () => {
        let shelfval = "none";
        if("shelf" in book) {
            shelfval = book.shelf;
        } else {
            if(shelfWiseBooks !== undefined) {
                for(const shelf of Object.keys(shelfWiseBooks)) {
                    if(shelfWiseBooks[shelf].includes(book.id)) {
                        shelfval = shelf;
                    }
                }
            }
        }
        return shelfval;
    }

    const shelfChange = (e) => {
        const selectedShelf = e.target.value;
        if(getShelfValue() !== selectedShelf) {
            onChangeShelf(book, selectedShelf, (!("shelf" in book) && getShelfValue() === "none"));
        }
    }
    return (
        <div key={book.id} className='book'>
            <div className='book-top'>
                <div className='book-cover' 
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: ("imageLinks" in book) ? `url(${book.imageLinks['smallThumbnail']})` : ''
                        }}>
                </div>
                <div className="book-shelf-changer">
                    <select defaultValue={getShelfValue()} onChange={shelfChange}>
                        <option value="default" disabled>{getShelfValue() === "none" ? "Add to..." : "Move to..."}</option>
                        <option value="currentlyReading" >Currently Reading</option>
                        <option value="wantToRead" >Want To Read</option>
                        <option value="read" >Read</option>
                        {(getShelfValue() === "none") ? <option value="none" >None</option> : ""}
                    </select>
                </div>
            </div>

            <div className="book-title">{("title" in book) ? book.title : ""}</div>
            <div className="book-authors">{("authors" in book) ? (book.authors).join(", ") : ""}</div>
        </div>
    )
}

BookInfo.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    shelfWiseBooks: PropTypes.object,
}

export default BookInfo;