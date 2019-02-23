import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [
  {path: 'add', component: AddUserComponent, data: {title: 'Create'}},
  {path: 'edit/:id', component: EditUserComponent, data: {title: 'Edit'}},
  {path: 'list', component: ListUserComponent, data: {title: 'List'}},
  {path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
