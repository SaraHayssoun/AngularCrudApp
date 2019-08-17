import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactFormComponent} from './contacts/contact-form.component';



const routes: Routes = [
    {
        path: 'addNew',
        component: ContactFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
