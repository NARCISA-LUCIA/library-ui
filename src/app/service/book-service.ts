import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './../model/book';

@Injectable()
export class BookService {
    constructor(private httpClient: HttpClient) { }
    
    createPosts(book: Book): Observable<Book>{
        return this.httpClient.post<Book>('/api/book', book);
    }

    get(id: number): Observable<Book>{
        const url = '/api/book/' + id;
        return this.httpClient.get<Book>(url);
    }

    getAll(): Observable<Book[]>{
        const url = '/api/book/all';
        return this.httpClient.get<Book[]>(url);
    }

    update(book: Book): Observable<Book>{
        return this.httpClient.put<Book>('/api/book', book);
    }

    delete(id: number): Observable<Book>{
        const url = '/api/book/' + id;
        return this.httpClient.delete<Book>(url);
    }
}
