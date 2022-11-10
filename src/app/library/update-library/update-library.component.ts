import { ToastrService } from 'ngx-toastr';
import { Library } from './../../model/model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/service/library-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-library',
  templateUrl: './update-library.component.html',
  styleUrls: ['./update-library.component.css'],
})
export class UpdateLibraryComponent implements OnInit {
  currentLibrary: Library;
  formControlGroup: FormGroup = this.formBuilder.group({
    id: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let libraryId = this.route.snapshot.params['id'];
    console.log('libraryId ' + libraryId);

    this.libraryService.get(libraryId).subscribe((result) => {
      console.log(result);
      this.currentLibrary = result;
      this.formControlGroup = this.formBuilder.group({
        id: new FormControl(result.id),
        name: new FormControl(result.name),
        address: new FormControl(result.address),
      });
    });
  }

  updateLibrary() {
    console.log('form ', this.formControlGroup.getRawValue());
    let library: Library = new Library();
    library.id = this.formControlGroup.controls['id'].value;
    library.name = this.formControlGroup.controls['name'].value;
    library.address = this.formControlGroup.controls['address'].value;

    this.libraryService.update(library).subscribe((result) => {
      console.log('update ' + result);
      this.showError(library.name);
    });
  }

  showError(libraryName: string) {
    this.toastr.error(
      'Library ' + libraryName + 'was not updated',
      'Library not update: '
    );
  }

  goBack(): void {
    this.location.back();
  }
}
