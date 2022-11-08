import { Author } from './../model/author';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorService {
  constructor(private httpClient: HttpClient) { }
  
  create(author: Author): Observable<Author>{
    return this.httpClient.post<Author>('/api/author', author);
  }

  get(id: number): Observable<Author> {
    const url = '/api/author/' + id;
    return this.httpClient.get<Author>(url);
  }

  getAllAuthors(): Observable<Author[]> {
    const url = '/api/author/all';
    return this.httpClient.get<Author[]>(url);
  }

  update(author: Author): Observable<Author>{
    return this.httpClient.put<Author>('/api/author', author);
  }
    
    
  delete(id: number): Observable<void>{
    const url = '/api/author/' + id;
    return this.httpClient.delete<void>(url);
  }
}
