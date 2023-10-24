import { createAction, props } from '@ngrx/store';
import { Book } from 'src/app/models/book';

export const actionBooksGetBooks = createAction('[Books] Get Books');
export const actionBooksGetBooksSuccess = createAction(
  '[Books] Get Books Success',
  props<{ books: Book[] }>()
);
export const actionBooksGetBooksFailure = createAction(
  '[Books] Get Books Failure',
  props<{ error: Error }>()
);

export const actionBooksGetBookDetails = createAction(
  '[Books] Get Book Details',
  props<{ id: string }>()
);
export const actionBooksGetBookDetailsSuccess = createAction(
  '[Books] Get Book Details Success',
  props<{ book: Book }>()
);
export const actionBooksGetBookDetailsFailure = createAction(
  '[Books] Get Book Details Failure',
  props<{ error: Error }>()
);

export const actionBooksAddBook = createAction(
  '[Books] Add Book',
  props<{ book: Book }>()
);
export const actionBooksAddBookSuccess = createAction(
  '[Books] Add Book Success',
  props<{ book: Book }>()
);
export const actionBooksAddBookFailure = createAction(
  '[Books] Add Book Failure',
  props<{ error: Error }>()
);

export const actionBooksUpdateBook = createAction(
  '[Books] Update Book',
  props<{ book: Book }>()
);
export const actionBooksUpdateBookSuccess = createAction(
  '[Books] Update Book Success',
  props<{ book: Book }>()
);
export const actionBooksUpdateBookFailure = createAction(
  '[Books] Update Book Failure',
  props<{ error: Error }>()
);

export const actionBooksDeleteBook = createAction(
  '[Books] Delete Book',
  props<{ id: string }>()
);
export const actionBooksDeleteBookSuccess = createAction(
  '[Books] Delete Book Success',
  props<{ id: string }>()
);
export const actionBooksDeleteBookFailure = createAction(
  '[Books] Delete Book Failure',
  props<{ error: Error }>()
);
