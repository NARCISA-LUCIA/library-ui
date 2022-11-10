import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Library } from './../model/model';
import { LibraryService } from './../service/library-service';
import { Component, OnInit, Pipe } from '@angular/core';
import { RemoveDialogComponent } from './dialog/remove-dialog/remove-dialog.component';
import { EditDialogComponent } from './dialog/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'address', 'edit', 'remove'];
  dataSource: MatTableDataSource<Library>;
  library: Library[] = [];
  constructor(
    private libraryService: LibraryService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllLibraries();
  }

  getAllLibraries(): void {
    this.libraryService.getAll().subscribe((result) => {
      console.log(result);
      if (result != null && result != undefined) {
        this.dataSource = new MatTableDataSource<Library>(result);
      }
    });
  }

  openDialog(library: Library): void {
    const dialogRef: MatDialogRef<RemoveDialogComponent, any> =
      this.dialog.open(RemoveDialogComponent, {
        data: { library },
      });
    console.log(library.name);
    dialogRef.afterClosed().subscribe((data) => {
      console.log('the modal is closed');
      if (data != null && data != undefined) {
        this.deleteLibrary(data.library);
      }
    });
  }

  openDialogEdit(library: Library): void {
    const formControlGroup = this.formBuilder.group({
      id: new FormControl(library.id),
      name: new FormControl(library.name),
      address: new FormControl(library.address),
    });
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { formControlGroup },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('edit closed');
      if (data != null) {
        library.id = data.formControlGroup.controls['id'].value;
        library.name = data.formControlGroup.controls['name'].value;
        library.address = data.formControlGroup.controls['address'].value;

        this.libraryService.update(library).subscribe(
          () => {
            console.log('Library is updated');
          },
          () => console.log('library was not updated')
        );
      }
    });
  }

  deleteLibrary(library: Library): void {
    this.libraryService.delete(library.id).subscribe(() => {
      const index = this.dataSource.data.findIndex((p) => p.id === library.id);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
      console.log('the library is delted');
    });
  }
}
