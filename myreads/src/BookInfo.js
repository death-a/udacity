import PropTypes from 'prop-types';

const BookInfo = ({ book, shelf }) => {
    return (
        <div>
            <select id={book.id}>
                <option value="none" disabled>{shelf === "none" ? "Add to.." : "Move to.."}</option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead" >Want To Read</option>
                <option value="read" >Read</option>
            </select>
            <p>{book.title}</p>
            <p>{book.authors}</p>
        </div>
        //`Title: ${book.title}, Authors: ${book.authors}`
    )
}

BookInfo.propTypes = {

}

export default BookInfo;