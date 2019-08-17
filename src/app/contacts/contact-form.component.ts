
import {Component} from '@angular/core';
import { Contact } from './contact';
import { NgForm } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
// import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
    constructor(private http: HttpClient) {}

    contacts: Contact[];

    private headers = new HttpHeaders({'Content-Type': 'application/json'});

    add(firstname: string, lastname: string, email: string, phone: string) {
        const newContact: Contact = {firstname, lastname, email, phone} as Contact;
        this.contacts.push(newContact);
        console.log( this.http.post<Contact>('http://localhost:4200/api/v1/contact', newContact));
    }
}
