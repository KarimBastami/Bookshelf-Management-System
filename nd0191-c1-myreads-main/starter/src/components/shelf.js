import PropTypes from "prop-types";

import Book from "./book";

function Shelf({_shelf, _onMoveBookToShelf}) {

    const shelfBooksList = _shelf.books;
    
    return (  
        <div className="bookshelf">
            <h2 className="bookshelf-title">{_shelf.name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {shelfBooksList.map((shelfBook) => {
                       return <Book key={shelfBook.id} 
                                    _book={shelfBook}
                                    _shelfName={_shelf.name}
                                    _onMoveBookToShelf={_onMoveBookToShelf} />
                    })}
                </ol>
            </div>
        </div>   
    );
}


Shelf.propTypes = {
    _shelf: PropTypes.object.isRequired,
    _onMoveBookToShelf: PropTypes.func.isRequired
};

export default Shelf;