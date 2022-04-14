import Shelf from "./Shelf";
import * as BooksAPI from './BooksAPI';
import { useState, useEffect } from 'react';

const BookShelf = () => {
    const [booksList, setBooksList] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            const res = await BooksAPI.getAll();
            //const shelves = [ 'currentlyReading', 'wantToRead', 'read' ];
            console.log(res);
            /*let shelvesIn = {}
            for(const shelf of shelves) {
                let booksIDs = []
                for(const book of res) {
                    if(book.shelf === shelf) {
                        booksIDs.push(book.id);
                    }
                }
                shelvesIn[shelf] = booksIDs;
            }*/
            setBooksList(res);
        };
        getBooks();
    }, []);

    const updateShelf = (response) => {
        console.log("update book list", response);
        const getAllBooks = async () => {
            const res = await BooksAPI.getAll();
            console.log("updt", res);
            setBooksList(res);
        }
        getAllBooks();
    }

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
                        <Shelf books={(booksList.filter(b => b.shelf === shelf))} shelf={shelf} onUpdateShelf={updateShelf} />
                    </ol>
                )
                })
            }
        </div>
    )
}

export default BookShelf;