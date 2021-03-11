import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Book } from './../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(
      'http://localhost:3000/books'
    );
  }

  getById(id: string): Observable<Book> {
    return this.http.get<Book>(
      `http://localhost:3000/books/${id}`
    );
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(
      'http://localhost:3000/books', book
    );
  }

  update(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(
      'http://localhost:3000/books/' + id, book
    );
  }
  delete(id: string) {
    return this.http.delete(
      `http://localhost:3000/books/${id}`
    );
  }

  search(books: Book[], title?: string, author?: string, genre?: string, year_of_release?: string): Book[] {
    var foundBooks: Book[];
    foundBooks = books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()))
      .filter(b => b.author.toLowerCase().includes(author.toLowerCase()))
      .filter(b => b.genre.includes(genre))
      .filter(b => b.year_of_release.toString().includes(year_of_release));
    return foundBooks;
  }
}
