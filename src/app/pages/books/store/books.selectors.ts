import { createSelector } from '@ngrx/store';
import { BooksState, selectBooksState } from './books.state';

export const selectBooks = createSelector(
  selectBooksState,
  (state: BooksState) => state
);

export const selectBooksList = createSelector(
  selectBooks,
  (state: BooksState) => state.books
);

export const selectSelectedBook = createSelector(
  selectBooks,
  (state: BooksState) => state.selectedBook
);

export const selectBooksLoading = createSelector(
  selectBooks,
  (state: BooksState) => state.loading
);

export const selectBooksError = createSelector(
  selectBooks,
  (state: BooksState) => state.error
);
