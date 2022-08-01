import "../css/App.css";
import { useState, useEffect } from "react";

import * as BooksAPI from "../utils/BooksAPI";
import Shelves from "./shelves"; 

function App() {

    const [shelves, setShelves] = useState([
        {
            name: "Currently Reading",
            books: []
        },
        {
            name: "Want to Read",
            books: []
        },
        {
            name: "Read",
            books: []
        },
    ]);
    


    const convertToLowerandRemoveSpaces = (str) => {
        return str.toLowerCase().replaceAll(" ", "");
    }


    const getShelfObjects = (shelfName) => {

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

        shelfName = convertToLowerandRemoveSpaces(shelfName);

        let {selectedShelf, allShelvesNotSelected} = getShelfObjects(shelfName);
        
        selectedShelf[0].books.push(book);

        const finalShelvesList = allShelvesNotSelected.concat(selectedShelf);
        setShelves(finalShelvesList);
    }


    const removeBookFromShelf = (book, shelfName) => {
        
    }


    const handleGetBookResponse = (res) => {
        res.map((bookDetails) => {

            const currentShelf = bookDetails.shelf;

            const bookObject = {
                bookName: bookDetails.title,
                bookAuthors: bookDetails.authors,
                bookPictureURL: bookDetails.imageLinks.thumbnail
            };

           return addBookToShelf(bookObject, currentShelf);
        })
    }


    useEffect(() => {
        const getAllBooksInShelves = async () => {
            const response = await BooksAPI.getAll();
            handleGetBookResponse(response);
        }

        getAllBooksInShelves();
        
    }, []);
    

    return (
        <div className="app">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            <Shelves _shelfList={shelves}/>
        </div>
    );
}

export default App;