import React from 'react';
import Shelves from "./shelves";

import {Link} from "react-router-dom";


function Home({_shelfList, _onMoveBookToShelf}) {
  return (
    <div className="app">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>

        <Shelves _shelfList={_shelfList}
                _onMoveBookToShelf={_onMoveBookToShelf}/>

        <Link to={"/search"} className="open-search">
            <button></button>
        </Link>
    </div>
  );
}

export default Home;