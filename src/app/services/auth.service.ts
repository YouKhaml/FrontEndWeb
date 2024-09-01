/*
import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  public users:any ={
    SuperAdmin:{password:"1234",roles:['SuperAdmin']},
    Admin:{password:"1234",roles:['Admin']},
  }
  public isAuthenticated : boolean=false;
  public user : any;
  public roles:string[]=[];

  constructor(private router:Router) { }
  public loginFct(login: string ,password:string):boolean{
    if(this.users[login] && this.users[login]['password']==password){
      this.isAuthenticated=true;
      this.user=login;
      this.roles=this.users[login]['roles'];
      return true;
    }else {
      return false
    }

  }


  logout() {
    this.isAuthenticated=false;
    this.user=undefined;
    this.roles=[];
    this.router.navigateByUrl("/login");
  }
}
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/api/authentification';

  public isAuthenticated: boolean = false;
  public user: any;
  public utilisateur:any;
  public role: string='';

  constructor(private router: Router, private http: HttpClient) {}

  public loginFct(login: string, password: string): Observable<any> {
    const authRequest = { username: login, password: password };
    return this.http.post<any>(this.apiUrl, authRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  public handleLoginResponse(response: any): boolean {
    if (response) {
      this.isAuthenticated = true;
      this.user = response.username;
      this.role = response.type;
      this.utilisateur=response;
      return true;
    } else {
      return false;
    }
  }
  public getAuthenticatedUser():any{
    return this.utilisateur;

  }
  public getRole():string{
    return this.role;
  }

  public logout() {
    this.isAuthenticated = false;
    this.user = undefined;
    this.role = '';
    this.router.navigateByUrl("/login");
  }

}
