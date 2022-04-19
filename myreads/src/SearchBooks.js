import BooksList from "./BooksList";
import { useState, useEffect } from "react";
import * as BooksAPI from './BooksAPI';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SearchBooks = ({ shelfWiseBooks, updateShelf }) => {
    const [booksList, setBooksList] = useState([]);
    const [searchText, setSearchText] = useState("");

    /*useEffect(() => {
        const searchBooks = () => {
            console.log("search", booksList, searchText);
            //const res = await BooksAPI.search(query, 20);
            //setBooksList(res);
        };
        searchBooks();
    }, [booksList, searchText]);*/

    const searchQuery = (query) => {
        setSearchText(query);
        if(query !== "") {
            const searchBooks = async () => {
                const res = await BooksAPI.search(query, 20);
                if(res.error === undefined) {
                    //console.log("search query", res);
                    setBooksList(res);
                }
            };
            searchBooks();
        } else {
            setBooksList([]);
        }
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/" >Go Back</Link>
                <div className="search-books-input-wrapper">
                    <input type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={searchText} 
                        onChange={(event) => searchQuery(event.target.value)} />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    <BooksList books={booksList} onUpdateShelf={updateShelf} shelfWiseBooks={shelfWiseBooks} />
                </ol>
            </div>
        </div>
    )
}

SearchBooks.propTypes = {
    shelfWiseBooks: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired,
}

export default SearchBooks;