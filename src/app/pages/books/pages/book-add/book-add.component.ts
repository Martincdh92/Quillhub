import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksState } from '../../store/books.state';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  actionBooksAddBook,
  actionBooksGetBookDetails,
  actionBooksUpdateBook,
} from '../../store/books.actions';
import { selectSelectedBook } from '../../store/books.selectors';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss'],
})
export class BookAddComponent implements OnInit {
  id: string;
  isAddMode: boolean;
  bookForm: FormGroup;

  constructor(
    private _store: Store<BooksState>,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.bookForm = this._formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', [Validators.required, this.isbnValidator()]],
      genre: ['', Validators.required],
      availableCopies: [0, Validators.min(0)],
    });

    this.id = this._route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      // fetch book details and set form values
      this._store.dispatch(actionBooksGetBookDetails({ id: this.id }));
      this._store.select(selectSelectedBook).subscribe((book) => {
        this.bookForm.patchValue(book);
      });
    }
  }

  onSubmit(): void {
    // stop here if form is invalid
    if (this.bookForm.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.createBook();
    } else {
      this.updateBook();
    }

    this._router.navigate(['/books/list']);
  }

  createBook(): void {
    this._store.dispatch(actionBooksAddBook({ book: this.bookForm.value }));
  }

  updateBook(): void {
    this._store.dispatch(
      actionBooksUpdateBook({ book: { ...this.bookForm.value, id: this.id } })
    );
  }

  isbnValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        // If the ISBN field is empty, consider it valid.
        return null;
      }

      // Regex for ISBN pattern (ISBN-10 or ISBN-13)
      const isbnPattern = /^(?:\d{9}[\dXx]|\d{13})$/;

      if (!isbnPattern.test(control.value)) {
        return { invalidISBN: true };
      }

      return null;
    };
  }
}
