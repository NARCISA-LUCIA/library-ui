import { FormBuilder,FormControl, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from './../service/book-service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { RemoveDialogComponent } from './dialog/remove-dialog/remove-dialog.component';
import { EditDialogComponent } from './dialog/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book: Book[] = [];
  dataSource: MatTableDataSource<Book>;

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'releaseYear',
    'remove',
    'edit'
  ]
  constructor(private bookService:BookService, private dialog:MatDialog, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(): void{
    this.bookService.getAll().subscribe((result) => {
      console.log("get al books:" + result);
      this.dataSource = new MatTableDataSource<Book>(result);
    });
}

  openEditBook(book:Book):void {
    const formControlGroup = this.formBuilder.group({
      id: new FormControl(book.id),
      name: new FormControl(book.name),
      description: new FormControl(book.description),
      releaseYear: new FormControl(book.releaseYear),
    });
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { formControlGroup },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != null) {
        book.id = data.formControlGroup.controls['id'].value;
        book.name = data.formControlGroup.controls['name'].value;
        book.description = data.formControlGroup.controls['description'].value;
        book.releaseYear = data.formControlGroup.controls['releaseYear'].value;
        
        this.bookService.update(book).subscribe(() => {
          console.log('book was updated');
        },
          () => console.log("book was not updated")
        );
      }
    });
  }

  openDialog(tableElement: Book): void {
    const name = tableElement.name;
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      data: { name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        this.bookService.delete(tableElement.id).subscribe(() => {
          const index = this.dataSource.data.findIndex(
            (arrayElement) => arrayElement.id === tableElement.id
          );
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }, () => console.log('book was not removed'));
      }
    });
  }
}
