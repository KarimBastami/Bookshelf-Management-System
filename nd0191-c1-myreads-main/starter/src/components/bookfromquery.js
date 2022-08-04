import React from 'react'
import PropTypes from "prop-types";


function BookFromQuery({_book}) {

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
                        <select>
                            <option disabled>
                            Move to...
                            </option>
                            <option value="currentlyReading">
                            Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                </div>

                <div className="book-title">{_book.title}</div>
                <div className="book-authors">
                    {
                        _book.hasOwnProperty("authors") &&
                        _book.authors.map((author) => {
                            return <div key={author} >{author}</div> 
                    })}
                </div>
            </div>
        </li>
    );
}


BookFromQuery.propTypes = {
    _book: PropTypes.object.isRequired
}

export default BookFromQuery