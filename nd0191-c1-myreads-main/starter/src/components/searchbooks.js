import React from 'react';
import debounce from 'lodash.debounce'
import PropTypes from "prop-types";

import {useState, useEffect, useMemo} from 'react';
import {Link} from 'react-router-dom';

import * as BooksAPI from "../utils/BooksAPI";
import BookFromQuery from './bookfromquery';


function SearchBooks({_addBook, _getCommonBooks, _shelves, _onMoveBookToShelf}) {

    const [query, setQuery] = useState("");
    const [searchBooks, setSearchBooks] = useState([]);
    const [commonBooks, setCommonBooks] = useState([]);

    const handleInputChange = useMemo(() => debounce(e => setQuery(e.target.value), 300), []);

    useEffect(() => {

        const searchForBooks = async () => {
            if (query) {
                const response = await BooksAPI.search(query);

                if (response.length !== undefined) {
                    setSearchBooks(response);
                } else {
                    setSearchBooks([]);
                }

            } else {
                setSearchBooks([]);
            }
        }

        searchForBooks();

    }, [query])


    useEffect(() => {
        const commonBooks = _getCommonBooks(searchBooks);
        setCommonBooks(commonBooks);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchBooks, _shelves])


    return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to={"/"} className="close-search"></Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title, author, or ISBN"
                               onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchBooks.map((book) => {
                            return <BookFromQuery key={book.id} 
                                                  _book={book}
                                                  _addBook={_addBook}
                                                  _commonBooks={commonBooks}
                                                  _onMoveBookToShelf={_onMoveBookToShelf}/>
                        })}
                    </ol>
                </div>
            </div>
    )
}


SearchBooks.propTypes = {
    _addBook: PropTypes.func.isRequired,
    _getCommonBooks: PropTypes.func.isRequired,
    _shelves: PropTypes.array.isRequired
}

export default SearchBooks;