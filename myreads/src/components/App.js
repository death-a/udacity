import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../css/App.css';
import * as BooksAPI from '../utils/BooksAPI';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';
import LogIn from './LogIn';

function App() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [shelfBookIDs, setShelfBookIDs] = useState({});
  const [token, setToken] = useState(BooksAPI.getToken());

  useEffect(() => {
    const getAllBooks = async () => {
      const res = await BooksAPI.getAll(getHeaders(token));
      setBooksList(res);
      setShelfWiseBookIds(res);
    }
    getAllBooks();
    
    if(localStorage.getItem("current_usertoken") !== null) {
      setUsername(JSON.parse(localStorage.getItem("current_username")));
    } else {
      setUsername("");
    }

  }, [token]);

  const getHeaders = (tokn) => {
    const header = {
      Accept: "application/json",
      Authorization: tokn,
    };
    return header;
  }

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
    setShelfBookIDs(shelvesIn);
  }

  const onUpdateShelf = (book, shelf, newBook) => {
    const changeShelf = async () => {
      const res = await BooksAPI.update(book, shelf, getHeaders(token));
      
      if(newBook) {
        book["shelf"] = shelf;
        setBooksList([...booksList, book]);
      } else {
        setBooksList(updateBooksList(res));
      }
      setShelfBookIDs({...res});
    }
    changeShelf();
  }

  const updateBooksList = (newBookShelf) => {
    let booksListArr = [];
    for(const shelf of Object.keys(newBookShelf)) {
        for(const bookID of newBookShelf[shelf]) {
            for(const b of booksList) {
                if(b.id === bookID) {
                  b["shelf"] = shelf;
                  booksListArr.push(b);
                }
            }
        }
    }
    return booksListArr; 
  }

  const logInUser = (user) => {
    BooksAPI.updateToken(user["token"], user["name"]);
    setToken(user["token"]);
    navigate("/");
  }

  const signInUser = (user_name, name, password) => {
    const tokn = BooksAPI.createUser(user_name, name, password);
    setToken(tokn);
    navigate("/");
  }

  const onLogOut = () => {
    setToken(BooksAPI.logoutUser());
  }

  return (
    <div className='app'>
      <Routes>
        <Route path="/login" 
          element={
            <LogIn handleLogIn={logInUser} 
              handleSignUp={signInUser} 
            />
          } 
        />
        <Route exact path="/" 
          element={
            <BookShelf username={username} 
              booksList={booksList} 
              shelfWiseBooks={shelfBookIDs} 
              updateShelf={(book, shelf, newBook) => onUpdateShelf(book, shelf, newBook)} 
              logOutUser={onLogOut} 
            />
          } 
        />
        <Route path="/search" 
          element={
            <SearchBooks shelfWiseBooks={shelfBookIDs} 
              updateShelf={(book, shelf, newBook) => onUpdateShelf(book, shelf, newBook)} 
              token={token}
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;