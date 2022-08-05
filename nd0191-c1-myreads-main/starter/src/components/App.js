import "../css/App.css";

import {useState, useEffect} from "react";
import {Link, Route, Routes} from "react-router-dom";

import * as BooksAPI from "../utils/BooksAPI";
import Shelves from "./shelves"; 
import SearchBooks from "./searchbooks";

function App() {

    const shelfTitles = ["Currently Reading", "Want to Read", "Read"]

    const [shelves, setShelves] = useState([
        {
            name: shelfTitles[0],
            books: []
        },
        {
            name: shelfTitles[1],
            books: []
        },
        {
            name: shelfTitles[2],
            books: []
        },
    ]);
    


    const convertToLowerandRemoveSpaces = (str) => {
        return str.toLowerCase().replaceAll(" ", "");
    }


    const getShelfObjects = (shelfName) => {

        shelfName = convertToLowerandRemoveSpaces(shelfName);

        let selectedShelf = shelves.filter((s) => {
            return convertToLowerandRemoveSpaces(s.name) === shelfName;
        });

        let allShelvesNotSelected = shelves.filter((s) => {
            return convertToLowerandRemoveSpaces(s.name) !== shelfName;
        });

        return {selectedShelf: selectedShelf,
                allShelvesNotSelected: allShelvesNotSelected};
    }


    const addBookToShelf = (book, shelfName) => {

        let {selectedShelf, allShelvesNotSelected} = getShelfObjects(shelfName);
        
        if (selectedShelf.length !== 0) {
            selectedShelf[0].books.push(book);
        }

        let finalShelvesList = allShelvesNotSelected.concat(selectedShelf);

        finalShelvesList = fitShelvesOrder(finalShelvesList);

        setShelves(finalShelvesList);
        BooksAPI.update({id: book.id}, shelfName);
    }


    const removeBookFromShelf = (book, shelfName) => {

        let {selectedShelf, allShelvesNotSelected} = getShelfObjects(shelfName);

        if (selectedShelf.length !== 0) {
            selectedShelf[0].books = selectedShelf[0].books.filter(b => book.title !== b.title);
        }

        let finalShelvesList = allShelvesNotSelected.concat(selectedShelf);

        finalShelvesList = fitShelvesOrder(finalShelvesList);

        setShelves(finalShelvesList);
    }


    const fitShelvesOrder = (allShelves) => {

        let finalShelves = [];

        shelfTitles.forEach((title) => {
            allShelves.forEach((shelf) => {
                shelf.name === title && finalShelves.push(shelf);
            })
        })
    
        return finalShelves;
    }


    const handleGetBookResponse = (res) => {
        if (res) {
            res.map((bookDetails) => {
               return addBookToShelf(bookDetails, bookDetails.shelf);
            })
        }
    }


    const moveBookToShelf = (book, shelfName) => {
        
        const {moveToShelfName, 
               moveFromShelfName} = shelfName;
        
        removeBookFromShelf(book, moveFromShelfName);
        addBookToShelf(book, moveToShelfName);
    }


    const getCommonBooks = (searchBooks) => {

        const booksInShelves = shelves.map((shelf) => {
            return shelf.books;
        }).flat(1);
        
        const commonBooks = booksInShelves.filter((book) => {
            return searchBooks.some((sBook) => {
                return book.id === sBook.id;
            })
        }) 

        return commonBooks;
    }


    useEffect(() => {
        const getAllBooksInShelves = async () => {
            const response = await BooksAPI.getAll();
            handleGetBookResponse(response);
        }

        getAllBooksInShelves();

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <Routes>
            <Route exact path="/" 
                   element={
                            <div className="app">
                                <div className="list-books-title">
                                    <h1>MyReads</h1>
                                </div>

                                <Shelves _shelfList={shelves}
                                        _onMoveBookToShelf={moveBookToShelf}/>

                                <Link to={"/search"} className="open-search">
                                    <button></button>
                                </Link>
                            </div>
                        } />
            
            <Route exact path="/search" element={<SearchBooks _addBook={addBookToShelf}
                                                              _getCommonBooks={getCommonBooks}
                                                              _shelves={shelves}/>}/>
        </Routes>
    );
}

export default App;