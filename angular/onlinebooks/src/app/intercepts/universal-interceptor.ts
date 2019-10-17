import {Injectable, Inject, Optional} from '@angular/core';
import {HttpInterceptor, HttpHandler,HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpResponse, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Request} from 'express';
//import {REQUEST} from '@nguniversal/express-engine/tokens';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Book } from '../models/book';
import { USERS } from '../data/users-mocks';
import { BOOKS } from '../data/books-mock';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient) {}
  books: Book[];
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //let serverReq: HttpRequest = req;
    /*
    if (this.request) {
      let newUrl = `${this.request.protocol}://${this.request.get('host')}`;
      if (!req.url.startsWith('/')) {
        newUrl += '/';
      }
      newUrl += req.url;
      //serverReq = req.clone({url: newUrl});
    }
    return of(new HttpResponse({ status: 200, body: USERS }));//next.handle(serverReq);*/
    /*
    * Get Books Google API 
    */
    if (req.url.endsWith('/books/v1/volumes') && req.method === 'GET') {     
      return next.handle(req);
    }
    // get users
    if (req.url.endsWith('/users') && req.method === 'GET') {
      // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
      if (req.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return of(new HttpResponse({ status: 200, body: USERS }));
      } else {
        // return 401 not authorised if token is null or invalid
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
      }
    }
    // get Books local
    if ((req.url.endsWith('/api/books') || req.url.includes('/api/books')) && req.method === 'GET') {
      let returnBooks = BOOKS;
        if (req.url.indexOf('?') >=0) {
          let sterm = req.url.split('?');
          sterm = sterm[1].split('=');
          returnBooks = BOOKS.filter(book => {
            if (sterm[0] == 'title') 
              return book.title.toLocaleLowerCase().indexOf(sterm[1].toLocaleLowerCase()) >= 0;
            else 
            return book.author.toLocaleLowerCase().indexOf(sterm[1].toLocaleLowerCase()) >= 0;
          });
        }
        return of(new HttpResponse({ status: 200, body: returnBooks }));      
    }
    //Log in
    if (req.url.endsWith('/user/login') && req.method === 'POST') {
      // find if any user matches login credentials
      let filteredUsers = USERS.filter(user => {
        return user.username === req.body.username && user.password === req.body.password;
      });

      if (filteredUsers.length) {
          // if login details are valid return 200 OK with user details and fake jwt token
          let user = filteredUsers[0];
          let body = {
              id: user.id,
              username: user.username,
              email: user.email,
              userType: user.userType,
              token: 'auth-user'
          };

          return of(new HttpResponse({ status: 200, body: body }));
      } else {
          // else return 400 bad request
          return throwError({ error: { message: 'Username or password is incorrect' } });
      }
      //return of(new HttpResponse({ status: 200, body: USERS }));      
    }
  }
}
/*export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: UniversalInterceptor,
  multi: true
};*/
