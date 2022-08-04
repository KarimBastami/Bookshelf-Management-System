import React from 'react';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SearchBooks() {

    const [query, setQuery] = useState("");

    const handleInputChange = e => setQuery(e.target.value);

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
                        
                    </ol>
                </div>
            </div>
    )
}

export default SearchBooks;