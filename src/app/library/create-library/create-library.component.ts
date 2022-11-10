import { ToastrService } from 'ngx-toastr';
import { LibraryService } from './../../service/library-service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Library } from 'src/app/model/model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-library',
  templateUrl: './create-library.component.html',
  styleUrls: ['./create-library.component.css'],
})
export class CreateLibraryComponent implements OnInit {
  formControlGroup: FormGroup = this.formBuilder.group({
    id: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private libraryService: LibraryService,
    private location: Location,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void { }
  
  createLibrary() {
    console.log("Form = ", this.formControlGroup.getRawValue());
    let library: Library = new Library();
    library.id = this.formControlGroup.controls['id'].value;
    library.name = this.formControlGroup.controls['name'].value;
    library.address = this.formControlGroup.controls['address'].value;

    this.libraryService.create(library).subscribe((result: Library) => {
      if (result) {
        console.log("result = ", result);
        this.showSuccess(library.name);
      };
    });
  }

  showSuccess(libraryName: string) {
    this.toastr.success("Library " + libraryName + " was created", "Library add: ");
  }

  goBack(): void {
    this.location.back();
  }
}
