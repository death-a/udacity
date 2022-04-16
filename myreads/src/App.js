import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';

function App() {
  const [booksList, setBooksList] = useState([]);
  const [shelfBookIDs, setShelfBookIDs] = useState({});

  useEffect(() => {
    const getBooks = async () => {
        const res = await BooksAPI.getAll();
        const shelves = [ 'currentlyReading', 'wantToRead', 'read' ];
        let shelvesIn = {}
        for(const shelf of shelves) {
            let booksIDs = []
            for(const book of res) {
                if(book.shelf === shelf) {
                    booksIDs.push(book.id);
                }
            }
            shelvesIn[shelf] = booksIDs;
        }
        setShelfBookIDs(shelvesIn);
        setBooksList(res);
    };
    getBooks();
  }, []);

  const updateShelf = () => {
    const getAllBooks = async () => {
        const res = await BooksAPI.getAll();
        setBooksList(res);
    }
    getAllBooks();
  }

  return (
    <Routes>
      <Route exact path="/" element={<BookShelf booksList={booksList} updateShelf={updateShelf} />} />
      <Route path="/search" element={<SearchBooks shelfWiseBooks={shelfBookIDs} />} />
    </Routes>
  );
}

export default App;