import { createFeatureSelector } from '@ngrx/store';
import { Book } from 'src/app/models/book';
import { AppState } from 'src/app/state/app-state';

export interface BooksState {
  books: Book[];
  selectedBook: Book;
  loading: boolean;
  error: any;
}

export interface State extends AppState {
  books: BooksState;
}

export const selectBooksState = createFeatureSelector<BooksState>('books');
