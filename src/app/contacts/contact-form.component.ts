
import {Component, Inject, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Contact } from './contact';
import { NgForm } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {observable, Observable} from 'rxjs';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit {

    formData: Contact;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<ContactFormComponent>) {}

    ngOnInit(): void {
        this.formData = {
            id: 0,
            firstname: this.data.contact.firstname,
            lastname: this.data.contact.lastname ,
            email: this.data.contact.email,
            phone: this.data.contact.phone,
        };
    }
}
