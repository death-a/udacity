import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';

function App() {
  //const [booksList, setBooksList] = useState([]);
  const [shelfBookIDs, setShelfBookIDs] = useState({});

  useEffect(() => {
    const getAllBooks = async () => {
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
      console.log("App", shelvesIn);
      setShelfBookIDs(shelvesIn);
      //setBooksList(res);
    }
    getAllBooks();
  }, []);

  const updateShelf = (res) => {
    //const getAllBooks = async () => {
        //const res = await BooksAPI.getAll();
        //setBooksList(res);
        setShelfBookIDs(res);
    //}
    //getAllBooks();
  }

  return (
    <Routes>
      <Route exact path="/" element={<BookShelf booksIDsList={shelfBookIDs} updateShelf={updateShelf} />} />
      <Route path="/search" element={<SearchBooks shelfWiseBooks={shelfBookIDs} updateShelf={updateShelf} />} />
    </Routes>
  );
}

export default App;