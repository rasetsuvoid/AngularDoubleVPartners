import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService {
  apiBase: string = '/DocumentType'
  constructor(private http: HttpClient) { }

  getAllDocumentTypes() : Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${environment.apiURL + this.apiBase}`)
  }
}
