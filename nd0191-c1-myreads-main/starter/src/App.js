import "./App.css";
import { useState } from "react";

import Shelves from "./shelves"; 

function App() {

    const [shelfList, setShelfList] = useState([
        {
            name: "Currently Reading",
            books: [{
                bookName: "To Kill a Mockingbird",
                bookAuthors: "Harper Lee",
                bookPictureURL: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api" 
            }]
        },
        {
            name: "Want to Read",
            books: [[{
                bookName: "",
                bookAuthors: "",
                bookPictureURL: "" 
            }]]
        },
        {
            name: "Read",
            books: [[{
                bookName: "",
                bookAuthors: "",
                bookPictureURL: "" 
            }]]
        },
        {
            name: "None",
            books: [[{
                bookName: "",
                bookAuthors: "",
                bookPictureURL: "" 
            }]]
        },
    ]);
    


    return (
        <div className="app">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            <Shelves _shelfList={shelfList}/>
        </div>
    );
}

export default App;