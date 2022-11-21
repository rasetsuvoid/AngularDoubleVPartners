import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRegister } from '../interfaces/auth-register';
import { ResponseApi } from '../interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBase: string = '/Users/'
  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${environment.apiURL+this.apiBase}Authenticate?username=${username}&password=${password}`);
  }

  register(request:AuthRegister) : Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${environment.apiURL+this.apiBase}Register`, request)
  }
}

