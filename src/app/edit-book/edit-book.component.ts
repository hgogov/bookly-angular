import { Book } from './../models/book.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from './../services/book.service';
import { GenreService } from './../services/genre.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: Book;
  bookId: string;
  genres: string[];

  bookForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    author: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    genre: ['', Validators.required],
    year_of_release: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(2048)]],
    imageUrl: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  loadBook() {
    this.bookService.getById(this.bookId).subscribe((res: Book) => {
      this.book = res;
      this.bookForm.setValue({
        "title": this.book.title,
        "author": this.book.author,
        "genre": this.book.genre,
        "description": this.book.description,
        "year_of_release": this.book.year_of_release,
        "imageUrl": this.book.imageUrl,
      });
    });
  }

  getGenres() {
    this.genreService.getAll().subscribe((res: string[]) => {
      if (res.length) {
        this.genres = res;
      } else {
        console.log("An error ocurred.");
      }
    });
  }

  onSubmit() {
    this.bookService
      .update(this.bookId, this.bookForm.value)
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/']);
        }
      })
  }

  ngOnInit(): void {
    this.loadBook();
    this.getGenres();
  }

}
