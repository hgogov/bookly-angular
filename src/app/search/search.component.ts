import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GenreService } from './../services/genre.service';
import { BookService } from './../services/book.service';
import { Book } from './../models/book.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  genres: string[];
  allBooks: Book[];
  foundBooks: Book[];

  dataSource = new MatTableDataSource<Book>();
  columnsToDisplay: string[] = ['imageUrl', 'title', 'author', 'details'];
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pageSize = 5;
  currentPage = 0;
  totalSize = 0;

  searchForm = this.formBuilder.group({
    title: [''],
    author: [''],
    genre: [''],
    year_of_release: ['']
  });


  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    private bookService: BookService
  ) { }

  getGenres() {
    this.genreService.getAll().subscribe((res: string[]) => {
      if (res.length) {
        this.genres = res;
      } else {
        console.log("An error ocurred.");
      }
    });
  }

  searchBooks() {
    this.foundBooks = this.bookService.search(
      this.allBooks,
      this.searchForm.get('title').value,
      this.searchForm.get('author').value,
      this.searchForm.get('genre').value,
      this.searchForm.get('year_of_release').value
    );
    if (this.foundBooks) {
      this.dataSource = new MatTableDataSource<Book>(this.foundBooks);
      this.totalSize = this.foundBooks.length;
      this.iterator();
      this.dataSource.paginator = this.paginator;
    } else {
      console.log("No books found.");
    }
  }

  getBooks() {
    this.bookService.getAll().subscribe((res: Book[]) => {
      if (res.length) {
        this.allBooks = res;
        console.log(this.allBooks);
      } else {
        console.log("An error ocurred.");
      }
    });
  }

  handlePage(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const current = this.foundBooks.slice(start, end);
    this.dataSource = new MatTableDataSource<Book>(current);
  }

  ngOnInit(): void {
    this.getGenres();
    this.getBooks();
  }

}
