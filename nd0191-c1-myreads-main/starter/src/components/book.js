import PropTypes from "prop-types";

function Book({_book}) {
    return (  
        <li key={_book.bookName}>
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
                    <select>
                        <option value="none" disabled>
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
                    return <div>{author}</div> 
                })}</div>
            </div>
        </li>
    );
}


Book.propTypes = {
    _books: PropTypes.object.isRequired
};

export default Book;