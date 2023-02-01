import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService  {
 private API_BASE_PATH = "http://localhost:4200/api/";
  constructor(private _http: HttpClient) { }
   
   getUsers(){
    return this._http.get(this.API_BASE_PATH + "users")
   }

   getuser(userId : number) {
    return this._http.get(`${this.API_BASE_PATH}users/${userId}`);
   }

   addUser(user : user) {
    return this._http.post(`${this.API_BASE_PATH}users`,user);
   }

   updateUser(user : user) {
    return this._http.put(`${this.API_BASE_PATH}users/${user.id}`,user);
   }

   deleteUser(userId :number) {
    return this._http.delete(`${this.API_BASE_PATH}users/${userId}`);
   }
}
