import { User } from '../models/user';

export var USERS: User[] = 
[
    {
        "id": 101,
        "username": "admin",
        "password": "admin",        
        "email": "admin@test.com",        
        "imageUrl": "assets/images/AngularJS1.JPG",               
        "userType": "Administrator"
    },
    {
        "id": 102,
        "username": "test",
        "password": "test",        
        "email": "test@test.com",        
        "imageUrl": "assets/images/AngularJS1.JPG",               
        "userType": "Reader"
    },
    {
        "id": 103,
        "username": "reader1",
        "password": "reader",        
        "email": "reader@test.com",        
        "imageUrl": "assets/images/AngularJS1.JPG",               
        "userType": "Reader"
    },
    {
        "id": 104,
        "username": "reader2",
        "password": "reader",        
        "email": "reader2@test.com",        
        "imageUrl": "assets/images/AngularJS1.JPG",               
        "userType": "Reader"
    }
]