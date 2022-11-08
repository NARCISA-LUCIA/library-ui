import { AuthorService } from './service/author-service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ToastrModule} from "ngx-toastr";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorComponent } from './author/author.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CreateAuthorComponent } from './author/create-author/create-author.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RemoveDialogComponent } from './dialog/remove-dialog/remove-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateAuthorComponent } from './author/update-author/update-author.component';
import { EditDialogComponent } from './dialog/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    CreateAuthorComponent,
    RemoveDialogComponent,
    UpdateAuthorComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  providers: [HttpClient, AuthorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
