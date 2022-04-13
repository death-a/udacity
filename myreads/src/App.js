import './App.css';
import * as BooksAPI from './BooksAPI';
import { useState, useEffect } from 'react';
import BookShelf from './BookShelf';

function App() {
  const [booksList, setBooksList] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      //console.log(res);
      setBooksList(res);
    };
    getBooks();
  }, []);
  return (
    <div>
      <h2>MyReads</h2>
      <BookShelf booksList={booksList} />
      
    </div>
  );
}

export default App;
