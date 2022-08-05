import React from 'react';
import PropTypes from "prop-types";
import {useState} from "react";

function BookFromQuery({_book, _addBook}) {

    let defaultShelf = "none";
    let bookURL = "";

    const [selectedShelf, setSelectedShelf] = useState(defaultShelf);
    // const [isCommonInShelf, setIsCommonInShelf] = useState(false);
    
    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;

        setSelectedShelf(selectedValue);
        _addBook(_book, selectedValue);
    }

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
    _book: PropTypes.object.isRequired,
    _addBook: PropTypes.func.isRequired
}

export default BookFromQuery