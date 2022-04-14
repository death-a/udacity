import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

const BookInfo = ({ book, shelf, onChangeShelf }) => {
    /*const [book, setBook] = useState([]);

    useEffect(() => {
        const getBook = async () => {
        const res = await BooksAPI.get(id);
        setBook(res);
        };
        getBook();
    }, [id]);*/

    const shelfChange = (e) => {
        const selectedShelf = e.target.value;
        console.log(shelf, selectedShelf);
        if(shelf !== selectedShelf) {
            let res;
            const changeShelf = async () => {
                res = BooksAPI.update(book, selectedShelf);
                console.log(res);
            }
            changeShelf();
            onChangeShelf(res);
        }
    }
    return (
        <div>
            <select id={book.id} defaultValue={shelf} onChange={shelfChange}>
                <option value="none" disabled>{shelf === "none" ? "Add to.." : "Move to.."}</option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead" >Want To Read</option>
                <option value="read" >Read</option>
            </select>
            <p>{book.title}</p>
            <p>{(book.authors)}</p>
        </div>
    )
}

BookInfo.propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
}

export default BookInfo;