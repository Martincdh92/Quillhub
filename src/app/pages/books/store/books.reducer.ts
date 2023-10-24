import { Action, createReducer, on } from '@ngrx/store';
import {
  actionBooksAddBookSuccess,
  actionBooksDeleteBookSuccess,
  actionBooksGetBookDetails,
  actionBooksGetBookDetailsFailure,
  actionBooksGetBookDetailsSuccess,
  actionBooksGetBooks,
  actionBooksGetBooksFailure,
  actionBooksGetBooksSuccess,
  actionBooksUpdateBookSuccess,
} from './books.actions';
import { BooksState } from './books.state';

export const initialState: BooksState = {
  books: [],
  selectedBook: {},
  loading: false,
  error: {},
};

const reducer = createReducer(
  initialState,
  on(actionBooksGetBooks, (state) => ({ ...state, loading: true })),
  on(actionBooksGetBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    loading: false,
  })),
  on(actionBooksGetBooksFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(actionBooksGetBookDetails, (state) => ({
    ...state,
    loading: true,
  })),
  on(actionBooksGetBookDetailsSuccess, (state, { book }) => ({
    ...state,
    selectedBook: book,
    loading: false,
  })),
  on(actionBooksGetBookDetailsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(actionBooksAddBookSuccess, (state, { book }) => ({
    ...state,
    books: [...state.books, book],
  })),
  on(actionBooksUpdateBookSuccess, (state, { book }) => ({
    ...state,
    books: state.books.map((p) => (p.id === book.id ? book : p)),
  })),
  on(actionBooksDeleteBookSuccess, (state, { id }) => ({
    ...state,
    books: state.books.filter((p) => p.id !== id),
  }))
);

export function booksReducer(
  state: BooksState | undefined,
  action: Action
): BooksState {
  return reducer(state, action);
}
