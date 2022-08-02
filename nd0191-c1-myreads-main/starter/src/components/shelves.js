import PropTypes from "prop-types";

import Shelf from "./shelf";

function Shelves({_shelfList}) {

    return (
        <div className="list-books-content">
            {_shelfList.map((shelf) => {
               return <Shelf key={shelf.name} 
                             _shelf={shelf}/>
            })}
        </div>
    );
}


Shelves.propTypes = {
    _shelfList: PropTypes.array.isRequired
};


export default Shelves;