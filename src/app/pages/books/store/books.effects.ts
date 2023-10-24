import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import {
  actionBooksAddBook,
  actionBooksAddBookFailure,
  actionBooksAddBookSuccess,
  actionBooksDeleteBook,
  actionBooksDeleteBookFailure,
  actionBooksDeleteBookSuccess,
  actionBooksGetBookDetails,
  actionBooksGetBookDetailsFailure,
  actionBooksGetBookDetailsSuccess,
  actionBooksGetBooks,
  actionBooksGetBooksFailure,
  actionBooksGetBooksSuccess,
  actionBooksUpdateBook,
  actionBooksUpdateBookFailure,
  actionBooksUpdateBookSuccess,
} from './books.actions';
import { BooksState } from './books.state';
import { BookService } from 'src/app/services/book-service';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private Bookservice: BookService,
    private store: Store<BooksState>
  ) {}

  getBooks = createEffect(() =>
    this.actions$.pipe(
      ofType(actionBooksGetBooks),
      switchMap(() =>
        this.Bookservice.getBooks().pipe(
          map((books) => actionBooksGetBooksSuccess({ books })),
          catchError((error) => of(actionBooksGetBooksFailure({ error })))
        )
      )
    )
  );

  getBookDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(actionBooksGetBookDetails),
      switchMap((action) =>
        this.Bookservice.getBookDetails(action.id).pipe(
          map((book) => actionBooksGetBookDetailsSuccess({ book })),
          catchError((error) => of(actionBooksGetBookDetailsFailure({ error })))
        )
      )
    )
  );

  addBook = createEffect(() =>
    this.actions$.pipe(
      ofType(actionBooksAddBook),
      switchMap((action) =>
        this.Bookservice.addBook(action.book).pipe(
          map((book) => actionBooksAddBookSuccess({ book })),
          catchError((error) => of(actionBooksAddBookFailure({ error })))
        )
      )
    )
  );

  updateBook = createEffect(() =>
    this.actions$.pipe(
      ofType(actionBooksUpdateBook),
      switchMap((action) =>
        this.Bookservice.updateBook(action.book).pipe(
          map((book) => actionBooksUpdateBookSuccess({ book })),
          catchError((error) => of(actionBooksUpdateBookFailure({ error })))
        )
      )
    )
  );

  deleteBook = createEffect(() =>
    this.actions$.pipe(
      ofType(actionBooksDeleteBook),
      switchMap((action) =>
        this.Bookservice.deleteBook(action.id).pipe(
          map(() => actionBooksDeleteBookSuccess({ id: action.id })),
          catchError((error) => of(actionBooksDeleteBookFailure({ error })))
        )
      )
    )
  );
}
