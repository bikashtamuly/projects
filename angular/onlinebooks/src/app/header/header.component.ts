import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookComponent } from '../book/book.component';
import { AuthService } from '../service/auth.service';

//import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {
  searchValue: string;
  filterValue: string;
  authUser: boolean = false;  
  userName: string = '';
  adminUser: boolean = false;  

  options = [
    { name: "Title", value: 'title' },
    { name: "Author", value: 'author' }
  ]

  constructor(private bookCmp: BookComponent, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.userName = currentUser.username;
      this.authUser = true;
      if (currentUser.userType == 'Administrator') {
        this.adminUser = true;
      }
    }
  }

  onKey(event: KeyboardEvent) { // with type info
    if (event.keyCode == 13) {
      this.searchValue = (<HTMLInputElement>event.target).value;
      this.bookCmp.addSearchTerm(this.searchValue);
      this.bookCmp.getLBooks();
      //this.bookCmp.addFilter(this.filterValue);
      
      //this.bookCmp.getBooks();
    }
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
