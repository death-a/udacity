import BooksList from "./BooksList";
import { useState, useEffect } from "react";
import * as BooksAPI from './BooksAPI';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SearchBooks = ({ shelfWiseBooks, updateShelf }) => {
    const [booksList, setBooksList] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        //console.log("search", searchText);
        const timeOut = setTimeout(async () => {
            //console.log("search query", searchText);
            if(searchText !== "") {
                const res = await BooksAPI.search(searchText, 20);
                //console.log("search", res);
                if(res !== undefined) {
                    ("error" in res) ? setBooksList(res.items) : setBooksList(res);
                }
            } else {
                setBooksList([]);
            }
        }, 500);

        return () => clearTimeout(timeOut);
    }, [searchText]);

    const searchQuery = (query) => {
        setSearchText(query);
        //if(query !== "") {
            const searchBooks = async () => {
                const res = await BooksAPI.search(query, 20);
                console.log("search result", res);
                if(res !== undefined) {
                    console.log("search query", query);
                    setBooksList(res);
                } else {
                    console.log("search query error", query);
                    setBooksList([]);
                }
            };
            //searchBooks();
        //} else {
            //setBooksList([]);
        //}
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