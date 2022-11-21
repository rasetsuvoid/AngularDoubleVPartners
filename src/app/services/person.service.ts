import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreatePersonRequest } from '../interfaces/create-person-request';
import { ResponseApi } from '../interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  apiBase: string = '/Person'
  constructor(private http: HttpClient) { }

  savePerson(request:CreatePersonRequest) : Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${environment.apiURL + this.apiBase}/CreateUser`, request)
  }

  getPerson() : Observable<ResponseApi>{
      return this.http.get<ResponseApi>(`${environment.apiURL + this.apiBase}`)
  }

  editPerson(request: CreatePersonRequest) : Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${environment.apiURL + this.apiBase}`, request)
  }

  deletePerson(id: number){
    return this.http.delete<ResponseApi>(`${environment.apiURL + this.apiBase}/${id}`)
  }
}
