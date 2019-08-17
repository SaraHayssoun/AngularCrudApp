import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContactsListComponent } from './contacts/contacts-list.component';
import {ContactFormComponent} from './contacts/contact-form.component';

@NgModule({
  declarations: [
    AppComponent, ContactsListComponent, ContactFormComponent
  ],
  imports: [
    BrowserModule,
    // HttpModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
