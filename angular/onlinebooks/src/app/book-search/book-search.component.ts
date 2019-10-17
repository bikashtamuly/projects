import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


import { BooksService } from '../service/books.service';
import { Book } from '../models/book';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.sass']
})
export class BookSearchComponent implements OnInit {
  filterValue: string = 'title';
  categoryFilterOption: string = '';
  options = [
    { name: "Title", value: 'title' },
    { name: "Author", value: 'author' }
  ]
  categoryOptions = [
    { name: 'All', value: ''},
    { name: "IT", value: 'IT' },
    { name: "IT BackboeJS", value: 'IT BackboeJS' }
  ]
  bodyText: string;
  results: Object;
  searchTerm$ = new Subject<string>();
  constructor(private bookService: BooksService, private modalService: ModalService) { 
    this.bookService.search(this.searchTerm$, this.filterValue)
      .subscribe(results => {
        this.results = results;
      });
  }

  ngOnInit() {}

  filterOptionChanged() {
    this.bookService.sendFilterVal(this.filterValue);
  }
  dataLength(data: Book[]) {
    return data.length > 0 ? true : false;
  }

  isBookAvailable(isAvail: boolean) {
    return isAvail;
  }

  bookIssued(e) {
    e.preventDefault();
    console.log(e);
  }
  openModal(id: string) {
    this.bodyText = id;
    this.modalService.open('custom-modal');
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
}

