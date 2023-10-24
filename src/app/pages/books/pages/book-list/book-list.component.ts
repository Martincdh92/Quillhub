import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { DeleteConfirmationDialogComponent } from '../../components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {
  actionBooksDeleteBook,
  actionBooksGetBooks,
} from '../../store/books.actions';
import {
  selectBooksList,
  selectBooksLoading,
} from '../../store/books.selectors';
import { BooksState } from '../../store/books.state';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  columnMappings: any[] = [
    { field: 'title', header: 'Title', visible: true },
    { field: 'author', header: 'Author', visible: true },
    { field: 'isbn', header: 'ISBN', visible: true },
    { field: 'genre', header: 'Genre', visible: true },
    { field: 'availableCopies', header: 'Available Copies', visible: true },
    { field: 'actions', header: 'Actions', visible: true },
  ];

  searchQuery: string = '';
  loading$: Observable<boolean>;
  dataLength = 0;

  displayedColumns: string[] = this.columnMappings
    .filter((column) => column.visible)
    .map((column) => column.field);

  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _store: Store<BooksState>,
    private _router: Router,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._store.dispatch(actionBooksGetBooks());

    this.loading$ = this._store.select(selectBooksLoading);

    this._store.select(selectBooksList).subscribe((books) => {
      this.dataSource = new MatTableDataSource(books);
      this.dataLength = books.length;

      this.dataSource.filterPredicate = (data, filter) => {
        const filterValue = filter.trim().toLowerCase();
        const titleMatch = data.title!.toLowerCase().includes(filterValue);
        const authorMatch = data.author!.toLowerCase().includes(filterValue);
        const genreMatch = data.genre!.toLowerCase().includes(filterValue);

        // Return true if the filter value is found in title, author or genre
        return titleMatch || authorMatch || genreMatch;
      };
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewChecked() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(id: string) {
    this._router.navigate(['books/edit/', id]);
  }

  openDeleteDialog(rowData: Book) {
    const dialogRef = this._dialog.open(DeleteConfirmationDialogComponent, {
      data: rowData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._store.dispatch(actionBooksDeleteBook({ id: rowData.id! }));
      }
    });
  }

  toggleColumn(column: { field: string; header: string; visible: boolean }) {
    column.visible = !column.visible;
  }
}
