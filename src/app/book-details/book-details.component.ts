import { Book } from './../models/book.model';
import { BookService } from './../services/book.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  bookId: string;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  loadBook() {
    this.bookService.getById(this.bookId).subscribe((res: Book) => (this.book = res));
  }

  deleteBook() {
    if (confirm("Are you sure you want to delete this?")) {
      this.bookService.delete(this.bookId).subscribe((res) => {
        this.router.navigate(['/']);
      })
    }
  }

  ngOnInit(): void {
    this.loadBook();
  }

}
