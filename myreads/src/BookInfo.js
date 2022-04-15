import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import { useState } from 'react';

const BookInfo = ({ book, onChangeShelf }) => {
    const [shelfValue, setShelfValue] = useState((book.shelf === undefined) ? "none" : book.shelf);
    //console.log("BookInfo",shelfValue);
    const shelfChange = (e) => {
        const selectedShelf = e.target.value;
        if(shelfValue !== selectedShelf) {
            const changeShelf = async () => {
                const res = await BooksAPI.update(book, selectedShelf);
                onChangeShelf();
            }
            changeShelf();
            setShelfValue(selectedShelf);
        }
    }
    return (
        <div>
            <select id={book.id} defaultValue={shelfValue} onChange={shelfChange}>
                <option value="none" disabled>{shelfValue === "none" ? "Add to.." : "Move to.."}</option>
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