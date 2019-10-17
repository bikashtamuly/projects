/**
 * Routing Module for online books
 * Author Bikash Tamuly
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookComponent } from './book/book.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SearchonlineComponent } from './searchonline/searchonline.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: BookComponent },
  { path: 'registration', component: UserRegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: BookSearchComponent },
  { path: 'admin', component: AdminSectionComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'searchonline', component: SearchonlineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
