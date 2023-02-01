import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { user } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let users : user[] = [
      { id: 100, title:'Mr', firstname: 'Muhammad', lastname: 'Ibrahim', dob: '02-12-2006', email: 'ik1463132@gmail.com', password: '123456', acceptTerms: true },
      { id: 101, title:'Mr', firstname: 'Ibrahim', lastname: 'Khan', dob: '03-10-2010', email: 'ik573174@gmail.com', password: '123455', acceptTerms: true },
      { id: 102, title:'Mr', firstname: 'Muhammad', lastname: 'Ibrahim Khan', dob: '05-10-1994', email: 'ik157642@gmail.com', password: '125456', acceptTerms: true },
      { id: 103, title:'Mr', firstname: 'Khan', lastname: 'I.K', dob: '03-08-2000', email: 'ik1573188@gmail.com', password: '123466', acceptTerms: true },
    ]
    return { users }
  }
}


