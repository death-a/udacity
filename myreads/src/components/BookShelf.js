import Shelf from "./Shelf";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";

const BookShelf = ({ username, booksList, shelfWiseBooks, updateShelf, logOutUser }) => {
    const [shelfBooks, setshelfBooks] = useState({});
    const btnText = (username !== "") ? "Log Out" : "Log In";
    let navigate = useNavigate();

    useEffect(() => {
        const createBookShelvesList = () => {
            let shelvesIn = {};
            if(shelfWiseBooks !== undefined) {
                for(const shelf of Object.keys(shelfWiseBooks)) {
                    let books = [];
                    for(const book of booksList) {
                        if(book.shelf === shelf) {
                            books.push(book);
                        }
                    }
                    shelvesIn[shelf] = books;
                }
            }
            setshelfBooks({...shelvesIn});
        }
        createBookShelvesList();
    }, [booksList, shelfWiseBooks])

    const handleLogInOut = (e) => {
        if(btnText === "Log In") {
            navigate("/login");
        } else {
            logOutUser();
        }
    }

    const handleLogIn = (e) => {
        if (username === "") {
            e.preventDefault();
            alert("Kindly login to use the search feature");
        }
    }

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>{(username !== "") ? username + "'s " : "My"}Reads</h1>
                <button className="login-button" onClick={handleLogInOut} >{btnText}</button>
            </div>
            <div className="list-books-content">
                <Shelf booksList={shelfBooks} updateShelf={updateShelf} />
            </div>
            <div className="open-search">
                <Link to="/search" onClick={handleLogIn} >Search Books</Link>
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    username: PropTypes.string.isRequired,
    booksList: PropTypes.array.isRequired,
    shelfWiseBooks: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired,
    logOutUser: PropTypes.func.isRequired,
}

export default BookShelf;