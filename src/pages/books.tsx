import React from "react";
import "./books.scss";
import { useNavigate } from "react-router-dom";
import { Book, getBooks } from '../utils/books-api';
import Loader from "react-loader-spinner";

export const Books = (): React.ReactElement => {
    const handleRedirect = (id: number) => { redirect(`/book-details/${id}`)};
    const redirect = useNavigate();

    const [spinner, spinnerState] = React.useState(false);    
    const [bookPage, booksState] = React.useState<Book[]>([]);
    const [pageNumber, pageNumberState] = React.useState(1);

    React.useEffect(() => {
        (async () => {
          spinnerState(true);
          const updatedBooks = await getBooks(pageNumber);
          booksState(oldBooks => [...oldBooks, ...updatedBooks]);
          spinnerState(false);
        })();
      }, [pageNumber]);

    return (
        <div className="books-page">
          <div className="booksList-div">
            {bookPage.map(book => (
                <div key={book.id} className="book-div" onClick={() => handleRedirect(book.id)}>
                    <div className="image">{book.coverImage ? <img className="image" src={book.coverImage} alt={book.title} /> : ""}</div>
                    <div className="title">
                        <p>{book.title}</p>
                    </div>
                </div>
            ))}
          </div>
          <div className="footer">
            {
            spinner ? ( 
              <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
            ) : (<div />)
            }
            <button className="button" onClick={() => pageNumberState(page => page + 1)}>
            Load more books
            </button>
          </div>  
        </div>        
    );
};