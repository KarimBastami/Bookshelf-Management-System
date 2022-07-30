import PropTypes from "prop-types";

import Book from "./book";

function Shelf({_shelf}) {

    const shelfBooksList = _shelf.books;
    
    return (  
        <div className="bookshelf">
            <h2 className="bookshelf-title">{_shelf.name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {shelfBooksList.map((shelfBook) => {
                       return <Book key={shelfBook.name} 
                                    _book={shelfBook}/>
                    })}
                </ol>
            </div>
        </div>   
    );
}


Shelf.propTypes = {
    _shelf: PropTypes.object.isRequired
};

export default Shelf;