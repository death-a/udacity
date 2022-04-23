import BooksList from "./BooksList";
import { useState, useEffect } from "react";
import * as BooksAPI from '../utils/BooksAPI';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SearchBooks = ({ shelfWiseBooks, updateShelf, token }) => {
    const [booksList, setBooksList] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const timeOut = setTimeout(async () => {
            if(searchText !== "") {
                const res = await BooksAPI.search(searchText, 20, getHeaders(token));
                if(res !== undefined) {
                    ("error" in res) ? setBooksList(res.items) : setBooksList(res);
                }
            } else {
                setBooksList([]);
            }
        }, 500);

        return () => clearTimeout(timeOut);
    }, [searchText, token]);

    const getHeaders = (tokn) => {
        return {
            Accept: "application/json",
            Authorization: tokn,
        };
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/" >Go Back</Link>
                <div className="search-books-input-wrapper">
                    <input type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={searchText} 
                        onChange={(event) => setSearchText(event.target.value)} />
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
    token: PropTypes.string.isRequired,
}

export default SearchBooks;