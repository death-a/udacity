import Shelf from "./Shelf";
import * as BooksAPI from './BooksAPI';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const BookShelf = ({ booksIDsList, updateShelf}) => {
    const [booksList, setBooksList] = useState([]);

    useEffect(() => {
        const getBooks = () => {
            console.log("BookShelf", booksIDsList);
            let booksListArr = [];
            Object.keys(booksIDsList).map( async (shelf) => {
                console.log("BookShelf", booksIDsList[shelf]);
                for(const bookID of booksIDsList[shelf]) {
                    const res = await BooksAPI.get(bookID);
                    console.log("BookShelf", res);
                    booksListArr.push(res);
                }
                console.log("BookShelf", booksListArr);
                setBooksList([...booksListArr, booksListArr]);
            });
            //setBooksList(booksListArr);
        }
        getBooks();
    }, [booksIDsList]);

    const shelvesInfo = {
        currentlyReading: 'Currently Reading',
        wantToRead: 'Want To Read',
        read: 'Read', 
    };

    return (    
        <div>
            {
                Object.keys(shelvesInfo).map((shelf) => {
                return (
                    <ol key={shelf}> {shelvesInfo[shelf]}
                        <Shelf books={(booksList.filter(b => b.shelf === shelf))} onUpdateShelf={updateShelf} />
                    </ol>
                )
                })
            }
            <Link to="/search" >Search Books</Link>
        </div>
    )
}

export default BookShelf;