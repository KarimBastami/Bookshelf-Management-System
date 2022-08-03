import "../css/App.css";
import { useState, useEffect } from "react";

import * as BooksAPI from "../utils/BooksAPI";
import Shelves from "./shelves"; 

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
    }


    const removeBookFromShelf = (book, shelfName) => {

        let {selectedShelf, allShelvesNotSelected} = getShelfObjects(shelfName);

        if (selectedShelf.length !== 0) {
            selectedShelf[0].books = selectedShelf[0].books.filter(b => book.bookName !== b.bookName);
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
    
                const currentShelf = bookDetails.shelf;
    
                const bookObj = {
                    id: bookDetails.id,
                    bookName: bookDetails.title,
                    bookAuthors: bookDetails.authors,
                    bookPictureURL: bookDetails.imageLinks.thumbnail
                };
    
               return addBookToShelf(bookObj, currentShelf);
            })
        }
    }


    const moveBookToShelf = (book, shelfName) => {
        
        const {apiMoveToShelfName, 
               uiMoveFromShelfName, 
               uiMoveToShelfName} = shelfName;
        
        removeBookFromShelf(book, uiMoveFromShelfName);
        addBookToShelf(book, uiMoveToShelfName);

        BooksAPI.update({id: book.id}, apiMoveToShelfName);
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
        <div className="app">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            <Shelves _shelfList={shelves}
                     _onMoveBookToShelf={moveBookToShelf}/>
        </div>
    );
}

export default App;