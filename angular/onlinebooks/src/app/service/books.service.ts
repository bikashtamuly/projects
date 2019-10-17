import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, of,Subject  } from 'rxjs';
import { catchError, tap, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
//import { MessageService } from './message.service';
import { appConfig } from '../app.config';
import { Book } from '../models/book';
import { Data } from '@angular/router';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  public bookUrl = appConfig.getBooks('');
  private booksUrl = 'api/books';  // URL to web api
  //private searchTerm = new Subject<any>();
  private searchTerm:string = '';
  private filterTerm:string = '';
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getGoogleBooks(term, filter): Observable <Book[]> {
    const params: any = {
      q: 'angularjs:keyes',
      key: appConfig.booksApiKey
    };   
    if (term && filter) {
      params.q = term + ':' + filter;
    }
    //this.log('Fetching news ...')
    return this.http.get<Data>(this.bookUrl, {params})
      .pipe(
        map(
          (data) => data.items? data.items
                        .map((item) => new Book(item)):''
                        //.filter((item) => item.id !== '')
        ),
        //tap(_ => this.log('Fetched books')),
        //catchError(this.handleError('getBooks', []))
      );
  }

  searchLocaleBooks(term: string) {
    if (!term.trim()) {
      // if not search term, return empty hero array. ?title=${term}
      return of([]);
    }
    return this.http.get<Book[]>(`/api/books?${this.filterTerm}=${term}`).pipe(
      /*map(
        (data) => data
                      .map((item) => {
                        //item.localBook = true;
                        new Book(item) 
                      })
                      //.filter(item => {
                      //  return item.title.indexOf(term) >= 0;
                      //})
                      //.filter((item) => item.title !== '')
      ),*/
      //tap(_ => this.log(`found heroes matching "${term}"`)),
      //catchError(this.handleError<Book[]>('searchHeroes', []))
    );
  }

  getLocaleBooks() {
    /*return this.http.get<Data>('/api/books')
      .pipe(
        map(
          (data) => data
                        .map((item) => {
                          item.localBook = true;
                          new Book(item) 
                        })
                        //.filter((item) => item.id !== '')
        ),
        //tap(_ => this.log('Fetched books')),
        //catchError(this.handleError('getBooks', []))
    );*/    
    let apiUrl = '/api/books';
    if (this.searchTerm) {
      apiUrl += '?title='+this.searchTerm;
    }
    return this.http.get<Book[]>(apiUrl)
      .pipe(
        //tap(_ => this.log('fetched heroes')),
        //catchError(this.handleError('getHeroes', []))
      );
    
  }

  sendSearchVal(searchVal: string) {
    //this.searchTerm.next({ text: searchVal });
    this.searchTerm = searchVal;
  }
  sendFilterVal(filterVal: string) {
    //this.searchTerm.next({ text: searchVal });
    this.filterTerm = filterVal;
  }

  /*filterBooks(books, filter?: string): Observable<Book[]> {
    return of(books).pipe(
      delay(2000),
      map(item => {
        // if filter is empty return all books
        if (!filter) {
          return item;
        }

        // search for specific countries
        const filteredBooks: Book[] = [];

        item.filter(function(bitem) {
          if (bitem.category.toLowerCase().includes(filter.toLowerCase())) {
            filteredBooks.push(bitem);
          }
        });

        return filteredBooks;
      })
    );
  }*/
  // New One
  search(terms: Observable<string>, filterValue: string) {
    this.filterTerm = filterValue;
    return terms.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term)));
  }
  searchEntries(term) {
    return this.http.get(`/api/books?${this.filterTerm}=${term}`).pipe();
    //return this.http
    //    .get(this.baseUrl + this.queryUrl + term)
    //    .map(res => res.json());
  }

  //////// Save methods //////////

  /** POST: add a new book to the server */
  addBook (book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, httpOptions).pipe(
      tap((newBook: Book) => this.log(`added hero w/ id=${newBook.id}`)),
      catchError(this.handleError<Book>('add Book'))
    );
  }

  /** DELETE: delete the book from the server */
  deleteBook (book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Book>('delete book'))
    );
  }

  /** PUT: update the book on the server */
  updateBook (book: Book): Observable<any> {
    return this.http.put(this.booksUrl, book, httpOptions).pipe(
      tap(_ => this.log(`updated book id=${book.id}`)),
      catchError(this.handleError<any>('update book'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
    
  }
}
