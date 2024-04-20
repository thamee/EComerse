import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) {}
  private baseUrl = 'https://localhost:5001';

  public isAuthenticated(): boolean {
    const token: any = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
  public login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/login`, {
      email: username,
      password: password,
    });
  }
  public getToken(): any {
    return localStorage.getItem('token');
  }
  public register(username: string, password: string,name:string,address:string) {
    return this.http.post<any>(`${this.baseUrl}/register`, {
      email: username,
      password: password,
      name:name,
      address:address
    });
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('token');
  }

  public getUserRole() {
    const token=this.getToken()
    let jwtData = this.jwtHelper.decodeToken(token);
    return jwtData.role
}
}
