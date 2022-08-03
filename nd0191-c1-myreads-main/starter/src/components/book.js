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
        const selectedShelfForAPI = e.target.value;
        
        setSelectedShelf(selectedShelfForAPI);
        _onMoveBookToShelf(_book, {apiShelfName: selectedShelfForAPI,
                                   uiShelfName: _shelfName})
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
                    `url(${_book.bookPictureURL})`,
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
                <div className="book-authors">{_book.bookAuthors.map((author) => {
                    return <div key={author} >{author}</div> 
                })}</div>
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