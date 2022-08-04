import React from 'react'
import PropTypes from "prop-types";


function BookFromQuery({_book}) {
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
                        `url(${_book.imageLinks.thumbnail})`,
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
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>

                <div className="book-title">{_book.title}</div>
                <div className="book-authors">
                    {_book.authors.map((author) => {
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