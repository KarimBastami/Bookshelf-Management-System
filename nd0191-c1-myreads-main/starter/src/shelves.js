import PropTypes from "prop-types";

import Shelf from "./shelf";

function Shelves({_shelfList}) {
    
    const notNoneShelves = _shelfList.filter(shelf => shelf.name !== "None");

    return (
        <div className="list-books-content">
            {notNoneShelves.map((shelf) => {
               return <Shelf _shelf={shelf}/>
            })}
        </div>
    );
}


Shelves.propTypes = {
    _shelfList: PropTypes.array.isRequired
};


export default Shelves;