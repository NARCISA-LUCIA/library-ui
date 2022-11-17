import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book-service';


@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  currentBook: Book;

  formControlGroup: FormGroup = this.formBuilder.group({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    releaseYear: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let bookId = this.route.snapshot.params['id'];
    this.bookService.get(bookId).subscribe((result) => {
      console.log('id update =', result);
      this.currentBook = result;
      
      this.formControlGroup = this.formBuilder.group({
        id: new FormControl(result.id),
        name: new FormControl(result.name),
        description: new FormControl(result.description),
        releaseYear: new FormControl(result.releaseYear),
      });
    });
  }

  updateBook() {
    console.log('update book: ', this.formControlGroup.getRawValue());
    let book: Book = new Book();
    book.id = this.formControlGroup.controls['id'].value;
    book.name = this.formControlGroup.controls['name'].value;
    book.description = this.formControlGroup.controls['description'].value;
    book.releaseYear = this.formControlGroup.controls['releaseYear'].value;

    this.bookService.update(book).subscribe((result) => {
      console.log('update result ', result);
    });
  }

  goBack() {
    this.location.back();
  }
}
