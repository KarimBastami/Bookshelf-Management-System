import React from 'react';
import PropTypes from "prop-types";
import {useState, useEffect} from "react";

function BookFromQuery({_book, _addBook, _commonBooks, _onMoveBookToShelf}) {

    let bookURL = "";

    const [selectedShelf, setSelectedShelf] = useState("none");
    
    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedShelf(selectedValue);
         
        const commonBookArr = _commonBooks.filter(b => b.id === _book.id);
        
        if (commonBookArr.length !== 0) {
            _onMoveBookToShelf(_book, {moveToShelfName: selectedValue,
                                       moveFromShelfName: commonBookArr[0].shelf})
        } else {
            _book.shelf = selectedValue;
            _addBook(_book, selectedValue);
        }
    }

    if (_book.hasOwnProperty("imageLinks")) {
        bookURL = _book.imageLinks.thumbnail;
    }  


    useEffect(() => {
        const commonBook = _commonBooks.filter(book => _book.id === book.id);
        const defaultShelf = (commonBook.length !== 0 && 
                              commonBook[0] !== undefined) ? commonBook[0].shelf : "none";
        
        setSelectedShelf(defaultShelf);
        
    }, [_commonBooks, _book])

    
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
    _addBook: PropTypes.func.isRequired,
    _commonBooks: PropTypes.array.isRequired
}

export default BookFromQuery