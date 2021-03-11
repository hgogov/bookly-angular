import { Component, OnInit, ViewChild } from '@angular/core';

import { Book } from './../models/book.model';
import { BookService } from './../services/book.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  allBooks: Book[];
  dataSource = new MatTableDataSource<Book>(this.allBooks);
  columnsToDisplay: string[] = ['imageUrl', 'title', 'author', 'genre', 'year_of_release', 'details'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pageSize = 5;
  currentPage = 0;
  totalSize = 0;

  constructor(private bookService: BookService) { }

  loadPage() {
    this.bookService.getAll().subscribe((response: Book[]) => {
      if (response.length) {
        this.allBooks = response;
        this.totalSize = this.allBooks.length;
        this.iterator();
        this.dataSource.paginator = this.paginator;
      }
      else {
        console.log("An error ocurred.");
      }
    })
  }

  handlePage(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const current = this.allBooks.slice(start, end);
    this.dataSource = new MatTableDataSource<Book>(current);
  }

  ngOnInit(): void {
    this.loadPage();
  }

}
