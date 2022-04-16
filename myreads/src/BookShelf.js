import Shelf from "./Shelf";
import { Link } from "react-router-dom";

const BookShelf = ({ booksList, updateShelf}) => {
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
                        <Shelf books={(booksList.filter(b => b.shelf === shelf))} onUpdateShelf={updateShelf} />
                    </ol>
                )
                })
            }
            <Link to="/search" >Search Books</Link>
        </div>
    )
}

export default BookShelf;