import Shelf from "./Shelf";
import { useState } from "react";
import * as BooksAPI from './BooksAPI';

const SearchBooks = () => {
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
            <input type="text" value={searchText} onChange={(event) => searchQuery(event.target.value)} />
            <Shelf books={booksList} onUpdateShelf={updateShelf} />
        </div>
    )
}

export default SearchBooks;