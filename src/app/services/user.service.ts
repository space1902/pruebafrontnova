import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient} from "@angular/common/http"

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient){}

  
  getUsers(){
    const endpoint = `${base_url}searchusers`;
    return this.http.get(endpoint);
  }
  createUsers(body: any){
    const endpoint = `${base_url}createuser`;
    return this.http.post(endpoint, body);
  }
}
