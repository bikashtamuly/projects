import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { UniversalInterceptor } from './intercepts/universal-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BookComponent } from './book/book.component';
import { SearchonlineComponent } from './searchonline/searchonline.component';
import { MessagesComponent } from './messages/messages.component';
import { CategoryFilterPipe } from './category-filter.pipe';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,    
    HeaderComponent,
    FooterComponent, 
    BookComponent,   
    SearchonlineComponent,
    MessagesComponent,
    CategoryFilterPipe,
    UserRegistrationComponent,
    LoginComponent,
    BookSearchComponent,
    AdminSectionComponent,
    AboutComponent,
    ContactUsComponent,
    ModalComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    Ng2SearchPipeModule,    
    HttpClientModule
  ],  
  providers: [BookComponent,
    { provide: HTTP_INTERCEPTORS, useClass: UniversalInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
