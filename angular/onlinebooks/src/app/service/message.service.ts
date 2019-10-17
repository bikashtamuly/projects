import { Injectable } from '@angular/core';
import {  timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: object[] = [];

  add(message: object) {
    this.messages.push(message);
    this.setTimer();
  }

  clear() {
    this.messages = [];
  }
  public setTimer(){

    // set showloader to true to show loading div on view    

    //this.timer        = Observable.timer(5000); // 5000 millisecond means 5 seconds
    //emit 0 after 1 second then complete, since no second argument is supplied
    const source = timer(5000);
    //output: 0
    const subscribe = source.subscribe(val => {
      this.clear();
    });
  }
}
