// import {OnInit, Component} from '@angular/core';
//
// import {Contact} from './contact';
// import {ContactsService} from './contacts.service';
//
//
// @Component({
//     selector: 'app-contacts',
//     templateUrl: './contacts-list.component.html',
//     providers: [ContactsService]
// })
//
// export class ContactsListComponent  implements OnInit {
//     contacts: Contact[];
//     editContact: Contact;
//
//     constructor(private contactService: ContactsService) {}
//
//     ngOnInit() {
//         this.getContacts();
//     }
//
//     getContacts(): void {
//         this.contactService.getContacts();//.subscribe(contacts => (this.contacts = contacts));
//     }
//
//     add(firstname: string, lastname: string, email: string, phone: string): void {
//         this.editContact = undefined;
//
//         const newContact: Contact = {firstname, lastname, email, phone} as Contact;
//         this.contactService.addContact(newContact);
//         //this.contacts.push(newContact);
//     }
//
//     delete(contact: Contact): void {
//         this.contacts = this.contacts.filter(c => c !== contact);
//         this.contactService.deleteContact(contact.id).subscribe();
//     }
//
//     edit(contact) {
//         this.editContact = contact;
//     }
//
//     update() {
//         if (this.editContact) {
//             this.contactService.updateContact(this.editContact).subscribe(contact => {
//                 const ix = contact ? this.contacts.findIndex(c => c.id === contact.id) : -1;
//                 if (ix > -1) {
//                     this.contacts[ix] = contact;
//                 }
//             });
//             this.editContact = undefined ;
//         }
//     }
// }


import {Component, OnInit} from '@angular/core';
import { Contact } from './contact';
import { NgForm } from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {RequestOptions} from '@angular/http';
import {catchError, map} from 'rxjs/operators';
@Component({
    selector: 'app-contacts',
    templateUrl: './contacts-list.component.html',
    // styleUrls: ['./contacts.component.css']
})
export class ContactsListComponent implements OnInit {
    constructor(private http: HttpClient) {}

    contacts: Contact[]
    editContact: Contact

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    title = 'Laravel Angular 4 App';

    ngOnInit() {
       console.log(this.getContacts());
    }

    getContacts() {
       return this.http.get('http://localhost:4200/api/v1/contacts').subscribe(contacts => {this.contacts = contacts as Contact[]; }) ;
    }

    add(firstname: string, lastname: string, email: string, phone: string) {
        // this.editContact = undefined;

        const newContact: Contact = {firstname, lastname, email, phone} as Contact;
        console.log(newContact);
        this.contacts.push(newContact);
        return this.http.post<Contact>('http://localhost:4200/api/v1/contacts',
            {firstname, lastname, email, phone}, {headers: this.headers});
    }

    delete(contact: Contact) {
        console.log(contact);
        this.contacts = this.contacts.filter(c => c !== contact);
        const url = `http://localhost:4200/api/v1/contacts/${contact.id}`;
        return this.http.delete(url).subscribe(contacts => {this.contacts = contacts as Contact[]; }) ;
    }

    edit(contact) {
        this.editContact = contact;
    }

    update() {
        if (this.editContact) {
            return this.http.put<Contact>('v1/contact/${contact.id}', this.editContact).subscribe(contact => {
                const ix = contact ? this.contacts.findIndex(c => c.id === contact.id) : -1;
                if (ix > -1) {
                    this.contacts[ix] = contact;
                }
            });
            this.editContact = undefined ;
        }
    }
}
