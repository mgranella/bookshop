const baseUrl = "http://localhost:3099/api/books";

export async function getFavoriteBook(user:string, bookid:number):Promise<boolean> { 
    const fullUrl = baseUrl + `?user=${encodeURIComponent(user)}&bookid=${bookid}`;
    const favoriteBook = await ( await fetch(fullUrl, { method: "GET" })).json();

    if(favoriteBook.favorite != undefined && favoriteBook.favorite){
        return true;
    }
    else {
        return false;
    }
}

export async function setFavoriteBook(user:string, bookid:number, favorite:boolean):Promise<boolean> {
    const bodyContent:string = JSON.stringify(
    {
        "user": user,
        "favoriteBookId": bookid,
        "favorite": favorite
    });

    const favoriteBook = await ( await fetch(baseUrl, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: bodyContent
        })).json();

    if(favoriteBook.favorite != undefined && favoriteBook.favorite){
        return true;
    }
    else {
        return false;
    }
}