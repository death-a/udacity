import './App.css';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function App() {
  const [booksList, setBooksList] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      console.log(res);
      setBooksList(res);
    };
    getBooks();
  }, []);
  return (
    <div>
      <h2>Books Info</h2>
      <div>
        <ol>
        {
          booksList.map((book) => (
            <li key={book.id}>
              {`Title: ${book.title}, Shelf: ${book.shelf}, Authors: ${book.authors}`}
            </li>
          ))
        }
        </ol>
      </div>
    </div>
  );
}

export default App;
