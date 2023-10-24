import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  public BOOK_DATA: Book[] = [
    {
      id: '1',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      isbn: '9780547928227',
      genre: 'Fantasy',
      availableCopies: 5,
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '9780061120084',
      genre: 'Classic',
      availableCopies: 3,
    },
    {
      id: '3',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      genre: 'Classic',
      availableCopies: 2,
    },
    {
      id: '4',
      title: 'Dune',
      author: 'Frank Herbert',
      isbn: '9780441172719',
      genre: 'Science Fiction',
      availableCopies: 7,
    },
    {
      id: '5',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      isbn: '9780316769174',
      genre: 'Classic',
      availableCopies: 4,
    },
    {
      id: '6',
      title: '1984',
      author: 'George Orwell',
      isbn: '9780451524935',
      genre: 'Dystopian',
      availableCopies: 6,
    },
    {
      id: '7',
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      isbn: '9780545018188',
      genre: 'Fantasy',
      availableCopies: 4,
    },
  ];

  constructor() {}

  getBooks(): Observable<Book[]> {
    const randomDelay = (Math.random() * 1000) + 500;
    return of(this.BOOK_DATA).pipe(delay(randomDelay));
  }

  getBookDetails(id: string): Observable<Book> {
    let book = this.BOOK_DATA.find((book) => book.id === id);
    if (book) {
      return of(book);
    } else {
      return throwError(() => new Error('Book not found'));
    }
  }

  addBook(book: Book): Observable<Book> {
    let bookToAdd = {
      ...book,
      id: this.BOOK_DATA.length + 1 + '',
    };
    let newBooks = [...this.BOOK_DATA, bookToAdd];
    this.BOOK_DATA = newBooks;
    return of(book);
  }

  updateBook(book: Book): Observable<Book> {
    let index = this.BOOK_DATA.findIndex((p) => p.id === book.id);
    let booksCopy = [...this.BOOK_DATA];

    if (index > -1) {
      booksCopy[index] = book;
      this.BOOK_DATA = booksCopy;
      return of(book);
    } else {
      return throwError(() => new Error('Book not found'));
    }
  }

  deleteBook(id: string): Observable<any> {
    let index = this.BOOK_DATA.findIndex((p) => p.id === id);
    let booksCopy = [...this.BOOK_DATA];

    if (index > -1) {
      booksCopy.splice(index, 1);
      this.BOOK_DATA = booksCopy;
      console.log('this.BOOK_DATA', this.BOOK_DATA);
      return of(null);
    } else {
      return throwError(() => new Error('Book not found'));
    }
  }
}
