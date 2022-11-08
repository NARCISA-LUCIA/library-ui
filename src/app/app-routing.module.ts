import { UpdateAuthorComponent } from './author/update-author/update-author.component';
import { CreateAuthorComponent } from './author/create-author/create-author.component';
import { AuthorComponent } from './author/author.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'author', component: AuthorComponent},
  {path: 'author/create', component: CreateAuthorComponent},
  {path: 'author/:id/update', component: UpdateAuthorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
