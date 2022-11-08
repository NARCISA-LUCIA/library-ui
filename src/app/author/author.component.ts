import { EditDialogComponent } from './../dialog/edit-dialog/edit-dialog.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { RemoveDialogComponent } from './../dialog/remove-dialog/remove-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthorService } from './../service/author-service';
import { Author } from './../model/author';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit {
  author: Author[] = [];
  dataSource: MatTableDataSource<Author>;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'remove',
    'edit',
  ];

  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(): void {
    this.authorService.getAllAuthors().subscribe((result) => {
      console.log(result);
      if (result != null && result != undefined) {
        this.dataSource = new MatTableDataSource<Author>(result);
      }
    });
  }

  openDialog(author: Author): void {
    const dialogRef: MatDialogRef<RemoveDialogComponent, any> =
      this.dialog.open(RemoveDialogComponent, {
        data: { author },
      });
    console.log(author.firstName);

    dialogRef.afterClosed().subscribe((data) => {
      console.log('the modal is closed!');
      if (data != null && data != undefined) {
        this.deleteAuthor(data.author);
        this.showSuccess(author.firstName);
      }
    });
  }
  showSuccess(authorName: string) {
    this.toastr.success(
      'Author ' + authorName + ' was deleted',
      'Author delete:'
    );
  }

  deleteAuthor(author: Author): void {
    this.authorService.delete(author.id).subscribe(() => {
      console.log('the author is deleted');
    });
  }

  openDialogEdit(author: Author): void {
    const formControlGroup = this.formBuilder.group({
      id: new FormControl(author.id),
      firstName: new FormControl(author.firstName),
      lastName: new FormControl(author.lastName),
    });
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        formControlGroup,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('update after closed ');
      if (data != null) {
        author.id = data.formControlGroup.controls['id'].value;
        author.firstName = data.formControlGroup.controls['firstName'].value;
        author.lastName = data.formControlGroup.controls['lastName'].value;

        this.authorService.update(author).subscribe(() => {
          console.log('A new author has been updated ');
        });
      }
    });
  }
}
