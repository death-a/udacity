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
    const getAllBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooksList(res);
      //console.log("App", res);
      setShelfWiseBookIds(res);
    }
    getAllBooks();
  }, []);

  const setShelfWiseBookIds = (books) => {
    const shelves = [ 'currentlyReading', 'wantToRead', 'read' ];
    let shelvesIn = {};
    for(const shelf of shelves) {
        let booksIDs = [];
        for(const book of books) {
            if(book.shelf === shelf) {
                booksIDs.push(book.id);
            }
        }
        shelvesIn[shelf] = booksIDs;
    }
    //console.log("App", shelvesIn);
    setShelfBookIDs(shelvesIn);
  }

  const onUpdateShelf = (book, shelf, fromComponent) => {
    const changeShelf = async () => {
      const res = await BooksAPI.update(book, shelf);
      //console.log("after await", res);
      //console.log("after update", fromComponent);
      if(fromComponent) {
        book["shelf"] = shelf;
        setBooksList([...booksList, book]);
      } else {
        setBooksList(updateBooksList(res));
      }
      setShelfBookIDs({...res});
    }
    changeShelf();
    //console.log(shelfBookIDs);
  }

  const updateBooksList = (newBookShelf) => {
    let booksListArr = [];
    for(const shelf of Object.keys(newBookShelf)) {
        for(const bookID of newBookShelf[shelf]) {
            for(const b of booksList) {
                //console.log("App updtBookList", b.id, bookID);
                if(b.id === bookID) {
                  b["shelf"] = shelf;
                  booksListArr.push(b);
                  //console.log("App updtBookList", b);
                }
            }
        }
    }
    //console.log("App updtBookList", booksListArr);
    return booksListArr; 
}

  return (
    <div className='app'>
      <Routes>
        <Route exact path="/" element={<BookShelf booksList={booksList} shelfWiseBooks={shelfBookIDs} updateShelf={(book, shelf, fromComponent) => onUpdateShelf(book, shelf, fromComponent)} />} />
        <Route path="/search" element={<SearchBooks shelfWiseBooks={shelfBookIDs} updateShelf={(book, shelf, fromComponent) => onUpdateShelf(book, shelf, fromComponent)} />} />
      </Routes>
    </div>
  );
}

export default App;