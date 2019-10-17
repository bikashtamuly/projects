import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../service/message.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class MessagesComponent implements OnInit {
  public showloader: boolean = false;      
  //private subscription: Subscription;
  //private timer: Observable<any>;

  constructor(public messageService: MessageService) {}

  ngOnInit() {
    
  } 

}
