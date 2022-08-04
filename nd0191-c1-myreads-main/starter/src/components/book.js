import PropTypes from "prop-types";
import {useState} from "react"

function Book({_book, _shelfName, _onMoveBookToShelf}) {

    let defaultShelf = "";

    switch (_shelfName) {
        case "Currently Reading":
            defaultShelf = "currentlyReading";
            break;

        case "Want to Read":
            defaultShelf = "wantToRead";
            break;

        case "Read":
            defaultShelf = "read";
            break;

        default:
            defaultShelf = "none";
            break;
    }

    const [selectedShelf, setSelectedShelf] = useState(defaultShelf);


    const handleSelectChange = (e) => {

        const moveToShelfName = e.target.value;
        const moveFromShelfName = _shelfName;

        const shelfNames = {
            moveToShelfName: moveToShelfName,
            moveFromShelfName: moveFromShelfName,
        }
    
        setSelectedShelf(moveToShelfName);
        _onMoveBookToShelf(_book, shelfNames);
    }


    let bookURL = "";

    if (_book.hasOwnProperty("imageLinks")) {
        bookURL = _book.imageLinks.thumbnail;
    }  

    return (  
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                        `url(${bookURL})`,
                    }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select value={selectedShelf} onChange={handleSelectChange}>
                            <option disabled>
                            Move to...
                            </option>
                            <option value="currentlyReading">
                            Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>

                <div className="book-title">{_book.bookName}</div>
                <div className="book-authors">
                    {_book.authors.map((author) => {
                        return <div key={author} >{author}</div> 
                    })}
                </div>
            </div>
        </li>
    );
}


Book.propTypes = {
    _book: PropTypes.object.isRequired,
    _shelfName: PropTypes.string.isRequired,
    _onMoveBookToShelf: PropTypes.func.isRequired
};

export default Book;