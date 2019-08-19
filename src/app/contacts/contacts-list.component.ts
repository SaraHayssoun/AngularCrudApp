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
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ContactFormComponent} from './contact-form.component';
import {ContactFormViewComponent} from './contact-form-view.component';



@Component({
    selector: 'app-contacts',
    templateUrl: './contacts-list.component.html',
})
export class ContactsListComponent implements OnInit {


    constructor(private http: HttpClient, private dialog: MatDialog) {}

    private contacts: Contact[]
    private editContact: Contact
    private contact: Contact


    ngOnInit() {
       this.getContacts();
    }

    OpenContactForm(contact) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = '50%';
        dialogConfig.data = {contact};
        this.dialog.open(ContactFormComponent, dialogConfig);
    }

    OpenContactFormView(contact) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = '50%';
        dialogConfig.data = {contact};
        this.dialog.open(ContactFormViewComponent, dialogConfig);
    }

    handleError(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

    getContacts() {
       return this.http.get('http://localhost:4200/api/v1/contacts')
           .subscribe(contacts => {this.contacts = contacts as Contact[]; }) ;
    }

    add(firstname: string, lastname: string, email: string, phone: string) {
        this.editContact = undefined;

        const newContact: Contact = {firstname, lastname, email, phone} as Contact

        this.post(newContact).subscribe(
                data => {
                    this.contact = data;
                }
            );
        this.contacts.push(this.contact);
    }

    post(contact: Contact): Observable<any> {
        return this.http.post('http://localhost:4200/api/v1/contacts', contact, {responseType: 'text'})
            .pipe(catchError(this.handleError));
    }

    delete(contact: Contact) {
        this.contacts = this.contacts.filter(c => c !== contact);
        const url = `http://localhost:4200/api/v1/contacts/${contact.id}`;
        return this.http.delete(url).subscribe(contacts => {this.contacts = contacts as Contact[]; }) ;
    }

    edit(contact) {

        this.editContact = contact;
        console.log('edit ' + contact.id);
    }

    update() {
        if (this.editContact) {
            return this.http.put<Contact>(`v1/contact/${this.editContact.id}`, this.editContact).subscribe(contact => {
                const ix = contact ? this.contacts.findIndex(c => c.id === contact.id) : -1;
                if (ix > -1) {
                    this.contacts[ix] = contact;
                }
            });
        }
        this.editContact = undefined;
    }
}
