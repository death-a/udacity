import Shelf from "./Shelf";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";

const BookShelf = ({ booksList, shelfWiseBooks, updateShelf}) => {
    const [shelfBooks, setshelfBooks] = useState({})

    useEffect(() => {
        const createBookShelvesList = () => {
            //const shelves = [ 'currentlyReading', 'wantToRead', 'read' ];
            //console.log("BookShelf", booksList);
            //console.log("BookShelf", shelfWiseBooks);
            let shelvesIn = {};
            if(shelfWiseBooks !== undefined) {
                for(const shelf of Object.keys(shelfWiseBooks)) {
                    let books = [];
                    for(const book of booksList) {
                        if(book.shelf === shelf) {
                            books.push(book);
                        }
                    }
                    shelvesIn[shelf] = books;
                }
            }
            setshelfBooks({...shelvesIn});
        }
        createBookShelvesList();
    }, [booksList, shelfWiseBooks])

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <Shelf booksList={shelfBooks} updateShelf={updateShelf} />
            </div>
            <div className="open-search">
                <Link to="/search" >Search Books</Link>
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    booksList: PropTypes.array.isRequired,
    shelfWiseBooks: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired,
}

export default BookShelf;