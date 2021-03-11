import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenreService } from './../services/genre.service';
import { BookService } from './../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

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
    private router: Router
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

  onSubmit() {
    this.bookService
      .create(this.bookForm.value)
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/']);
      }
    })
  }

  ngOnInit(): void {
    this.getGenres();
  }

}
