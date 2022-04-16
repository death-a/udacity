import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

const BookInfo = ({ book, onChangeShelf, shelfWiseBooks }) => {
    const getShelfValue = () => {
        let shelfval = "none";
        if("shelf" in book) {
            shelfval = book.shelf;
        } else {
            if(shelfWiseBooks !== undefined) {
                Object.keys(shelfWiseBooks).map((shelf) => {
                    if(shelfWiseBooks[shelf].includes(book.id)) {
                        shelfval = shelf;
                    }
                });
            } else {
                console.log("Shelf Wise Books array is not present");
            }
        }
        return shelfval;
    }

    console.log("BookInfo", getShelfValue());
    const shelfChange = (e) => {
        const selectedShelf = e.target.value;
        if(getShelfValue() !== selectedShelf) {
            const changeShelf = async () => {
                const res = await BooksAPI.update(book, selectedShelf);
                onChangeShelf();
            }
            changeShelf();
            //setShelfValue(selectedShelf);
        }
    }
    return (
        <div>
            <select id={book.id} defaultValue={getShelfValue()} onChange={shelfChange}>
                <option value="none" disabled>{getShelfValue() === "none" ? "Add to.." : "Move to.."}</option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead" >Want To Read</option>
                <option value="read" >Read</option>
            </select>
            <p>{book.title}</p>
            <p>{(book.authors)}</p>
        </div>
    )
}

BookInfo.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
}

export default BookInfo;