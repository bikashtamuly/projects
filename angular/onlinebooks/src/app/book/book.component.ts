import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { BooksService } from '../service/books.service';

import { Book } from '../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {
  books: Book[];
  searchFilters: string = '';
  searchTerm: string = '';
  subscription: Subscription;
  categoryFilterOption: string = '';
  
  categoryOptions = [
    { name: 'All', value: ''},
    { name: "Angular JS", value: 'AngularJS' },
    { name: "BackboeJS", value: 'IT BackboeJS' }
  ]
  constructor(private bookService: BooksService) {
    
   }

  ngOnInit() {
    //this.getBooks();
    this.getLBooks();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    //this.subscription.unsubscribe();
  }
  //getLocaleBooks
  getLBooks(): void {
    this.bookService.sendSearchVal(this.searchTerm);
    this.bookService.getLocaleBooks()
    .subscribe(
      books => this.books = books
    )
  }

  getBooks(): void {
    this.bookService.sendSearchVal(this.searchTerm);
    this.bookService.sendFilterVal(this.searchFilters);
    this.bookService.getGoogleBooks(this.searchTerm, this.searchFilters)
    .subscribe(
      books => {
        this.addBooks(books);
      }
    )
  }

  addBooks(books) {
    this.books = books;
  }

  clearBooks() {
    this.books = [];
  }

  addFilter(filterVal: string) {
    this.searchFilters = filterVal;
  }

  addSearchTerm(searchVal: string) {
    this.searchTerm = searchVal;
  }

}
