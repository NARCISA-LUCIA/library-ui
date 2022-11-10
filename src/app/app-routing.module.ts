import { UpdateLibraryComponent } from './library/update-library/update-library.component';
import { CreateLibraryComponent } from './library/create-library/create-library.component';
import { LibraryComponent } from './library/library.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "library", component: LibraryComponent},
  {path: "library/create", component: CreateLibraryComponent},
  {path: "library/:id/update", component: UpdateLibraryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
