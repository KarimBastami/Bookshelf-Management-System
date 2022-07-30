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
        {
            name: "None",
            books: []
        },
    ]);
    

    const addBookToShelf = (book, shelfName) => {

        shelfName = shelfName.toLowerCase().replaceAll(" ", "");

        let selectedShelf = shelves.filter((s) => {
            return s.name.toLowerCase().replaceAll(" ", "") === shelfName;
        });

        let allShelvesNotSelected = shelves.filter((s) => {
            return s.name.toLowerCase().replaceAll(" ", "") !== shelfName;
        });
        
        selectedShelf[0].books.push(book);

        const finalShelvesList = allShelvesNotSelected.concat(selectedShelf);
        setShelves(finalShelvesList);
    }


    const handleBookResponse = (res) => {
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
            handleBookResponse(response);
        }

        getAllBooksInShelves()
        
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