const baseUrl = "https://gutendex.com/books";

export type Book = {
    id: number;
    title: string,
    authors: Author[],
    coverImage: string
};

export type Author = {
    name: string;
};

export const getBook = async (id: number): Promise<Book[]> => {
    const fullUrl = baseUrl + `/${id}`;
    const bookdetail = await ( await fetch(fullUrl, { method: "GET" })).json();

    return(
      [{
        id: bookdetail.id,
        title: bookdetail.title,
        coverImage: bookdetail.formats["image/jpeg"],
        authors: bookdetail.authors
      }] 
    );
}

export const getBooks = async (pageNum: number = 1): Promise<Book[]> => {
    const fullUrl = baseUrl + `/?page=${pageNum}`;
    const books = await (await fetch(fullUrl, { method: "GET" })).json();    

    type BookResponse = {
        id: number;
        title: string;
        authors: Author[];
        formats: Format;
      };    
      
      type Format = {
        [mimetype: string]: string;
      };

    return books.results.map((book: BookResponse) => ({
      id: book.id,
      title: book.title,
      coverImage: book.formats["image/jpeg"],
      authors: book.authors,
    }));   
  };


