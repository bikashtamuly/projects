export class Book {
    id: number;
    isbn: number;
    title: string;    
    author: string;
	description: string;
	rating: number;
    imgUrl: string;
    issued: boolean;
    category: string
    location: string
    issueDate: string
    returnDate: string
    localBook: boolean

    constructor(data: any = {}) {
        if (data.localBook) {
            this.isbn = data.isbn;
            this.title = data.title;
            this.author = data.author;
            this.description = data.description;
            this.rating = data.rating;
            this.imgUrl = data.imgUrl;
            this.issued = data.issued;
        }
        else {
            this.isbn = data[ 'volumeInfo' ] && data[ 'volumeInfo' ]['industryIdentifiers']?data[ 'volumeInfo' ]['industryIdentifiers'][0][ 'identifier' ]:'';
            this.title = data[ 'volumeInfo' ] ? data[ 'volumeInfo' ][ 'title' ] : '';
            this.author = data[ 'volumeInfo' ] && data[ 'volumeInfo' ][ 'authors' ] ? data[ 'volumeInfo' ][ 'authors' ][0] : '';
            this.description = data[ 'volumeInfo' ] ? data[ 'volumeInfo' ][ 'description' ]: '';
            this.rating = 0;
            this.imgUrl = data[ 'volumeInfo' ] && data[ 'volumeInfo' ][ 'imageLinks' ]?data[ 'volumeInfo' ][ 'imageLinks' ][ 'thumbnail' ]:'';
            this.issued = false;
        }                
      }
}
