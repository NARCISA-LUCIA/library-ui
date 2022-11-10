import { Observable } from 'rxjs';
import { Library } from './../model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LibraryService {
  constructor(private httpClient: HttpClient) {}

  create(library: Library): Observable<Library> {
    return this.httpClient.post<Library>('/api/library', library);
  }

  get(id: number): Observable<Library> {
    const url = '/api/library/' + id;
    return this.httpClient.get<Library>(url);
  }

  getAll(): Observable<Library[]> {
    const url = '/api/library/all';
    return this.httpClient.get<Library[]>(url);
  }

  update(library: Library): Observable<Library> {
    return this.httpClient.put<Library>('/api/library', library);
  }

  delete(id: number): Observable<void> {
    const url = '/api/library/' + id;
    return this.httpClient.delete<void>(url);
  }
}
