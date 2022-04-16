import Shelf from "./Shelf";
import { useState } from "react";
import * as BooksAPI from './BooksAPI';
import { Link } from "react-router-dom";

const SearchBooks = ({ shelfWiseBooks }) => {
    const [booksList, setBooksList] = useState([]);
    const [searchText, setSearchText] = useState("");

    /*useEffect(() => {
        const searchBooks = async () => {
            const res = await BooksAPI.search(query, 20);
            setBooksList(res);
        };
        searchBooks();
    }, []);*/

    const searchQuery = (query) => {
        
        //console.log(query);
        if(query !== "" && query.length > 3) {
            const searchBooks = async () => {
                const res = await BooksAPI.search(query, 20);
                if(res.error === undefined) {
                    console.log(res);
                    setBooksList(res);
                }
            };
            searchBooks();
        } else {
            //console.log(booksList);
            setBooksList([]);
        }
        setSearchText(query);
    }

    const updateShelf = () => {
        console.log("search update")
        /*const getAllBooks = async () => {
            const res = await BooksAPI.getAll();
            setBooksList(res);
        }
        getAllBooks();*/
    }
    return (
        <div>
            <Link to="/" >Go Back</Link>
            <input type="text" value={searchText} onChange={(event) => searchQuery(event.target.value)} />
            <Shelf books={booksList} onUpdateShelf={updateShelf} shelfWiseBooks={shelfWiseBooks} />
        </div>
    )
}

export default SearchBooks;