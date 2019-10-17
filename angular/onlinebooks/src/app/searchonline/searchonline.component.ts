import { Component, OnInit } from '@angular/core';


import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


import { BooksService } from '../service/books.service';
import { Book } from '../models/book';
import { ModalService } from '../service/modal.service';


@Component({
  selector: 'app-searchonline',
  templateUrl: './searchonline.component.html',
  styleUrls: ['./searchonline.component.sass']
})
export class SearchonlineComponent implements OnInit {

  books$: Observable<Book[]>;
  private searchTerms = new Subject<string>();
  filterValue: string = 'title';
  categoryFilterOption: string = '';
  bodyText: string;

  options = [
    { name: "Title", value: 'title' },
    { name: "Author", value: 'author' }
  ]
  categoryOptions = [
    { name: 'All', value: ''},
    { name: "IT", value: 'IT' },
    { name: "IT BackboeJS", value: 'IT BackboeJS' }
  ]
  animal: string;
  name: string;
  
  constructor(private bookService: BooksService, private modalService: ModalService) { }

  filterOptionChanged() {
    this.bookService.sendFilterVal(this.filterValue);
  }

  // Push a search term into the observable stream.
  
  search(term: string): void {
    this.bookService.sendFilterVal(this.filterValue);
    this.searchTerms.next(term);    
  }
  
  getLBooks(searchTerm: string): void {
    this.bookService.sendSearchVal(searchTerm);
    this.bookService.searchLocaleBooks(searchTerm)
    .subscribe(
      books => books
    )
  }
  bookSaved(e) {
    e.preventDefault();
    console.log(e);
  }

  ngOnInit() {
    this.bodyText = '';
    this.books$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.bookService.getGoogleBooks(term, 'title')),
    );    
  }

  dataLength(data: Book[]) {
    console.log('Book Length : '+data.length);
    return data.length > 0 ? true : false;
  } 

  openModal(id: string) {
    this.bodyText = id;
    this.modalService.open('custom-modal');
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

}
