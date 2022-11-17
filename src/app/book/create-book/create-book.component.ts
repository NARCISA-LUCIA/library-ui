import { Location } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book-service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  formControlGroup: FormGroup = this.formBuilder.group({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    releaseYear: new FormControl('')
  });

  constructor(private bookService:BookService, private formBuilder:FormBuilder, private location:Location) { }

  ngOnInit(): void {
  }

  createBook() {
    console.log("Form =", this.formControlGroup.getRawValue());
    let book: Book = new Book();
    book.id = this.formControlGroup.controls['id'].value;
    book.name = this.formControlGroup.controls['name'].value;
    book.description = new this.formControlGroup.controls['description'].value;
    book.releaseYear = new this.formControlGroup.controls['releaseYear'].value;
    this.bookService.createPosts(book).subscribe((result: Book) => {
      if (result) {
        console.log("result =", result);
      }
    });
  }

  goBack(): void{
    this.location.back();
  }
}
