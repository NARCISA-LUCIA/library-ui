import { AuthorService } from './../../service/author-service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Author } from 'src/app/model/author';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css'],
})
export class CreateAuthorComponent implements OnInit {
  formControlGroup: FormGroup = this.formBuilder.group({
    id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });
  constructor(
    private formBuilder: FormBuilder,
    private authoService: AuthorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  createAuthor() {
    console.log('Form author =', this.formControlGroup.getRawValue());
    let author: Author = new Author();
    author.id = this.formControlGroup.controls['id'].value;
    author.firstName = this.formControlGroup.controls['firstName'].value;
    author.lastName = this.formControlGroup.controls['lastName'].value;

    this.authoService.create(author).subscribe((result: Author) => {
      if (result) {
        console.log('result author =', result);
        this.showSuccess(author.firstName);
      }
    });
  }
  showSuccess(authorName: string) {
    this.toastr.success('Author ' + authorName + ' was created', 'Author add:');
  }
}
