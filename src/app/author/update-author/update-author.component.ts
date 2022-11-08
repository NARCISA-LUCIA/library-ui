import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthorService } from './../../service/author-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/model/author';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.css'],
})
export class UpdateAuthorComponent implements OnInit {
  // author: Author = new Author();
  currentAuthor: Author;
  formControlGroup: FormGroup = this.formBuilder.group({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });
  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    // let idAutor = this.route.snapshot.params['id'];
    // this.getAuthorById(idAutor);

    let authorId = this.route.snapshot.params['id'];
    console.log('authorId: ' + authorId);
    this.authorService.get(authorId).subscribe((result) => {
      console.log("res: " + JSON.stringify(result));
      this.currentAuthor = result;
      this.formControlGroup = this.formBuilder.group({
        id: new FormControl(result.id),
        firstName: new FormControl(result.firstName),
        lastName: new FormControl(result.lastName),
      });
    });
  }

  // getAuthorById(authorId: number) {
  //   this.authorservice.get(authorId).subscribe((result) => {
  //     if (result) {
  //       console.log("it is working", JSON.stringify(result));
  //       this.author = result;
  //   }
  //   });
  // }

  updateAuthor() {
    console.log("form = ", this.formControlGroup.getRawValue());
    let author: Author = new Author();
    author.id = this.formControlGroup.controls['id'].value;
    author.firstName = this.formControlGroup.controls['firstName'].value;
    author.lastName = this.formControlGroup.controls['lastName'].value;

    this.authorService.update(author).subscribe((result) => {
      console.log("update author: " + result);
      this.showSuccess(author.firstName);
    });
  }
  showSuccess(authorName: string){
    this.toastr.success('author' + authorName + "was created", "Author add");
  }
}
