import { UpdateBookComponent } from './book/update-book/update-book.component';
import { CreateBookComponent } from './book/create-book/create-book.component';
import { BookComponent } from './book/book.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'book', component: BookComponent },
  { path: 'create/book', component: CreateBookComponent },
  { path: 'update/:id/book', component: UpdateBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
