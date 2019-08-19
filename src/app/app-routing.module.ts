import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ContactsListComponent} from './contacts/contacts-list.component';
import {ContactFormComponent} from './contacts/contact-form.component';

const routes: Routes = [
  {path: '', redirectTo : 'contacts', pathMatch: 'full'},
  // {path: 'contacts', component: ContactsListComponent},
  {path: 'contacts', children: [
      {path: '', component: ContactsListComponent},
      {path: 'edit/:id', component: ContactFormComponent}
    ]},
  {path: 'contact', children: [
      // {path: '', component: ContactFormComponent},
      {path: 'edit/:id', component: ContactFormComponent}
    ]}
  ];

@NgModule({
  declarations: [],
  imports: [
      RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
