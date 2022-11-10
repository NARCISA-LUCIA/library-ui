import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LibraryService } from './service/library-service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibraryComponent } from './library/library.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import { CreateLibraryComponent } from './library/create-library/create-library.component';
import { ToastrModule } from "ngx-toastr";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { UpdateLibraryComponent } from './library/update-library/update-library.component';
import { RemoveDialogComponent } from './library/dialog/remove-dialog/remove-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditDialogComponent } from './library/dialog/edit-dialog/edit-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    CreateLibraryComponent,
    UpdateLibraryComponent,
    RemoveDialogComponent,
    EditDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [LibraryService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
