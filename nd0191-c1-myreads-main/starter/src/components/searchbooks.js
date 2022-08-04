import React from 'react';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from "../utils/BooksAPI";
import BookFromQuery from './bookfromquery';

function SearchBooks({_addBook}) {

    const [query, setQuery] = useState("");
    const [searchBooks, setSearchBooks] = useState([]);

    const handleInputChange = e => setQuery(e.target.value);


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


    return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to={"/"} className="close-search"></Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title, author, or ISBN"
                               value={query}
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