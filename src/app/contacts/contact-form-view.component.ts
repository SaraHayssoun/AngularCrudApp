
import {Component, Inject, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Contact } from './contact';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-contact-form-view',
    templateUrl: './contact-form-view.component.html',
})
export class ContactFormViewComponent implements OnInit {

    formData: Contact;

    constructor(private http: HttpClient,
                @Inject(MAT_DIALOG_DATA) public data,
                public dialogRef: MatDialogRef<ContactFormViewComponent>) {}

    ngOnInit(): void {
        if (this.data.contact !== null) {
            this.formData = Object.assign({}, this.data.contact);
        }
    }
}
