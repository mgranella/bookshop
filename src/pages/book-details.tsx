import React from "react";
import { getBook, Book } from "../utils/books-api";
import "./book-details.scss";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartBroken } from '@fortawesome/free-regular-svg-icons'
import { getFavoriteBook, setFavoriteBook } from '../utils/favorite-book-api'
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";

export const BookDetails = (): React.ReactElement => {   

    const userEmail: string = 'useremail@mail.com';
    const urlParam = useParams();
    const bookid: string = urlParam.bookid ? urlParam.bookid : "";
    let bookDetailResponse: Book[] = [];
    const [book, bookState] = React.useState<Book>();    
    const [favoriteBook, favoriteBookState] = React.useState(false);
    const [spinner, spinnerState] = React.useState(false);  
    const redirect = useNavigate();
    const handleRedirect = () => { redirect('/')};
    const toggleFavorite = () => {    
        setFavoriteBook(userEmail, parseInt(bookid), !favoriteBook).then(
            async (data: boolean) => {                     
                favoriteBookState(data);
            }
        );
    };

    React.useEffect(() => {
        spinnerState(true);
        getBook(parseInt(bookid)).then(async (data: Book[]) => {
            bookDetailResponse = [
                {
                    id: data[0].id,
                    title: data[0].title,
                    authors: data[0].authors,
                    coverImage: data[0].coverImage
                }
            ];

            bookState(bookDetailResponse[0]);
        });

        getFavoriteBook(userEmail, parseInt(bookid)).then(
            async (data: boolean) => {
                favoriteBookState(data);
            }
        );
    }, [urlParam.bookid]);

    return (
    <div>
        <div className='book-container'>
            { book ? (
                <div className='book-details'>
                    <div>
                        {book.title}
                    </div>
                    <div className='favorite-box'>
                        <div className='favorite'>
                            <button onClick={() => {toggleFavorite()}}> <FontAwesomeIcon icon={favoriteBook ? faHeart : faHeartBroken} /> </button>
                        </div>                    
                        <div className='book-image'>
                            <img src={ book.coverImage } alt={ book.title }/>
                        </div>
                    </div>
                    <div className='author-box'>
                        <div>
                            <div>Author:</div>
                            <div className='book-author'>
                                    {
                                        book.authors.map( bookauthors => (
                                            bookauthors.name
                                        ))
                                    }
                            </div>
                        </div>
                    </div>
                </div>
                ) : (
                        spinner ? ( 
                          <Loader
                          type="Puff"
                          color="#00BFFF"
                          height={100}
                          width={100}
                          timeout={3000} //3 secs
                        />
                        ) : ('')                   
                    )  
            }
        </div>
        <div className="footer">
                <button className="backButton" onClick={() => handleRedirect()}>
                    Back to List
                </button>
        </div>
    </div>
    );

};