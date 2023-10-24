import { TestBed } from '@angular/core/testing';
import { BookService } from './book-service';

describe('BookService', () => {
  let bookService: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookService],
    });

    bookService = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(bookService).toBeTruthy();
  });

  describe('getBooks', () => {
    it('should return a list of books', (done) => {
      bookService.getBooks().subscribe((books) => {
        expect(books).toBeTruthy();
        expect(books.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should simulate a delay', (done) => {
      const startTime = new Date().getTime();
      bookService.getBooks().subscribe(() => {
        const endTime = new Date().getTime();
        const timeDiff = endTime - startTime;
        expect(timeDiff).toBeGreaterThanOrEqual(500);
        done();
      });
    });
  });

  describe('getBookDetails', () => {
    it('should return a book when provided a valid id', (done) => {
      const validBookId = '1';
      bookService.getBookDetails(validBookId).subscribe((book) => {
        expect(book).toBeTruthy();
        expect(book.id).toBe(validBookId);
        done();
      });
    });
  });
});
