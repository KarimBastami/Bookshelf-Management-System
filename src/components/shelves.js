import PropTypes from "prop-types";

import Shelf from "./shelf";

function Shelves({_shelfList, _onMoveBookToShelf}) {

    return (
        <div className="list-books-content">
            {_shelfList.map((shelf) => {
               return <Shelf key={shelf.name} 
                             _shelf={shelf}
                             _onMoveBookToShelf={_onMoveBookToShelf}/>
            })}
        </div>
    );
}


Shelves.propTypes = {
    _shelfList: PropTypes.array.isRequired,
    _onMoveBookToShelf: PropTypes.func.isRequired
};


export default Shelves;