
import {Component, Inject, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Contact } from './contact';
import { NgForm } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {observable, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit {

    formData: Contact;
    private contacts: Contact[]

    getContacts() {
        return this.http.get('http://localhost:4200/api/v1/contacts')
            .subscribe(contacts => {this.contacts = contacts as Contact[]; }) ;
    }

    constructor(private http: HttpClient,
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<ContactFormComponent>) {}

    ngOnInit(): void {
        this.getContacts();
        if (this.data.contact !== null) {
            // console.log(this.data);
            this.formData = Object.assign({}, this.data.contact);
        }
    }
    add(firstname: string, lastname: string, email: string, phone: string) {
        // this.editContact = undefined;

        const newContact: Contact = {firstname, lastname, email, phone} as Contact

        this.post(newContact).subscribe(
            data => {
                this.formData = data;
            }
        );
        this.dialogRef.close();
        this.contacts.push(this.formData);


    }

    post(contact: Contact): Observable<any> {
        return this.http.post('http://localhost:4200/api/v1/contacts', contact, {responseType: 'text'})
            .pipe(catchError(this.handleError));
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
}
