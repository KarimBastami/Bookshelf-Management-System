import React from 'react';
import debounce from 'lodash.debounce'

import {useState, useEffect, useMemo} from 'react';
import {Link} from 'react-router-dom';

import * as BooksAPI from "../utils/BooksAPI";
import BookFromQuery from './bookfromquery';


function SearchBooks({_addBook, _getCommonBooks}) {

    const [query, setQuery] = useState("");
    const [searchBooks, setSearchBooks] = useState([]);

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
        _getCommonBooks(searchBooks);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchBooks])

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
                                                  _addBook={_addBook}/>
                        })}
                    </ol>
                </div>
            </div>
    )
}

export default SearchBooks;